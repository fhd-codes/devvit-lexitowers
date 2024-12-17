import { Devvit, useState, useInterval } from '@devvit/public-api';

import { PageProps } from "../interfaces.ts";
import { GAME_CONTAINER } from "../global-constants.ts";
import { valid_words } from '../helpers/words.ts'

import {
    generateRandomLetters,
    secondsToTimeFormat,
} from "../helpers/play-screen.helper.ts";

import LetterTile from "../components/LetterTile.tsx";
import GameCompletitionPopup from '../components/GameCompletitionPopup.tsx';

const WORD_LENGTH = 6;
const GAME_TIME_SEC = 130;

/*
 * There can be a total of 7 layers, and each layer will
 * have the following number of bricks.
*/
const BRICK_QTY_IN_LAYERS = [3, 2, 3, 3, 2, 4];

const TIMEBAR_COLORS = [
    'red', // 0% - 25%
    'orange', // 25% - 50%
    'yellow', // 50% - 75%
    'white', // 75% - 99%
    'white', // 100%
];

const PlayScreen = ({setPage}: PageProps) => {

    const useResettableState = (initialValue: any) => {
        const [state, setState] = useState(initialValue);
        const resetState = () => setState(initialValue);
        return [state, setState, resetState];
    };

    const [gameTimer, setGameTimer] = useState(GAME_TIME_SEC);
    const [timeBarWidth, setTimeBarWidth] = useState<any>('100%');
    const [timeBarColor, setTimeBarColor] = useState<string>('white');

    const [lettersPool, setLettersPool] = useState<any>([generateRandomLetters(), generateRandomLetters()]);
    const [selectedPoolLetter, setSelectedPoolLetter, resetSelectedPoolLetter] = useResettableState({ letter: '', id: null, selected: false, score: 0 });
    const [word, setWord, resetWord] = useResettableState(
        Array.from({ length: WORD_LENGTH }, () => {
            return { letter: '', id: null, selected: false, score: 0 }
        })
    );

    const [lexiBricks, setLexiBricks] = useState<Array<Array<string>>>([]);
    const [footerText, setFooterText, resetFooterText] = useResettableState('');

    // ----------------------------------------
    // ------- Game timer logic --------------
    const updateInterval = useInterval(() => {
        const timer = gameTimer > 0 ? (gameTimer - 1) : 0;
        setGameTimer(timer);
        const time_percent_value = (timer/GAME_TIME_SEC) * 100;
        setTimeBarWidth( time_percent_value.toString() + '%');
        setTimeBarColor(TIMEBAR_COLORS[Math.floor(time_percent_value / 25)]);
    }, 1000);

    updateInterval.start(); // Starting the game timer clock.
    // ----------------------------------------
    // ----------------------------------------
    // - - - - - - - - - - - - - - - - -

    const generateLetterPool = () => {
        /**
         * Generating 2 arrays of random numbers to show in 2 lines.
         * Doing this to work with Devvit layout.
        */
        setLettersPool([
            generateRandomLetters(),
            generateRandomLetters(),
        ]);
    }

    const handlePoolLetterClick = (pool_letter: any) => {
        if (!pool_letter.selected) {
            // Selecting.
            setSelectedPoolLetter(pool_letter);
            markPoolLetterAsSelected(pool_letter, true)
        } else {
            // Unselecting.
            resetSelectedPoolLetter();

            const pool_letter_in_word = word.findIndex((el: any) => (el.id === pool_letter.id)) >= 0;
            if (!pool_letter_in_word) {
                markPoolLetterAsSelected(pool_letter, false);
            }
        }
    }

    const markPoolLetterAsSelected = (pool_letter: any, is_selected: boolean) => {
        /**
         * This function is used to update the selected status of the pool letter.
         * The idea is that a letter from the pool can only be used once. If the same letter
         * is needed again, the user has to regenerate the pool letters until he/she
         * finds the required letter again.
         *
         * This function updates the `seleted` key in the letter object.
        */

        // Updating the pool letter array to make the letter unavailable.
        const updated_pool_letters = [...lettersPool];

        updated_pool_letters.some(subarray => {
            const obj = subarray.find((item: any) => item.id === pool_letter.id);
            if (obj) {
                obj.selected = is_selected; // Update directly
                return true; // Exit loop once updated
            }
            return false;
        });

        setLettersPool(updated_pool_letters);
    }

    const handleWordLetterClick = (letter_index: number) => {
        /**
         * If the user clicks on a letter space which is empty, the selected
         * letter will go at that place. If the user clicks on the letter space which has
         * a letter in it, the letter will be removed from that space.
         * Removing the letter will also make the poll letter availbale to use.
        */
        const word_copy = word;
        if ('' === word_copy[letter_index].letter){
            word_copy[letter_index]  = selectedPoolLetter;
            resetSelectedPoolLetter();
        } else {
            // Removing the letter from that space.
            word_copy[letter_index]  = { letter: '', id: null, selected: false, score: 0 };
        }
        // Marking letter as un-selected.
        markPoolLetterAsSelected(word_copy[letter_index], false);
        setWord([...word_copy]);
        resetFooterText();
    }

    const clearWord = () => {
        // Resetting the word array and footer text.
        resetWord(); resetFooterText();

        // Clearing any selected pool letter
        const updated_pool_letters = [...lettersPool].map(subarray =>
            subarray.map((item: any) => ({...item, selected: false}))
        );
        setLettersPool(updated_pool_letters);
    }

    const makeLexiBricks = (assembled_word: string) => {
        /*
            The purpose of this function is to group the words into pairs,
            so that the tower should have 2 bricks (words) in each layer
        */

        const bricks = [...lexiBricks];
        const active_layer_index = Math.max(bricks.length - 1, 0);

        if ((bricks[active_layer_index] ?? []).length < BRICK_QTY_IN_LAYERS[active_layer_index]) {
            bricks[active_layer_index] = bricks[active_layer_index] || []; // For the very first brick.
            bricks[active_layer_index].push(assembled_word);
        } else {
            bricks.push([assembled_word]);
        }

        setLexiBricks([...bricks]);
        resetWord(); resetFooterText();
        generateLetterPool();
    }

    const checkWord = () => {
        const assembled_word = word.map((el: any) => el.letter).join('');
        // Checking if the assembled word is present in the valid words list.
        if ( !valid_words.has( assembled_word.toLowerCase() ) ) {
            setFooterText( 'Entered word is not valid' );
            return;
        };

        makeLexiBricks( assembled_word );
    }

  // =================================
  // =================================
  return (
    <zstack width='100%' height='100%' alignment='center middle'>
        <vstack height="100%" width="100%" alignment="middle center" padding="medium">
            <vstack height="100%" width={GAME_CONTAINER} alignment="middle" gap='small'>
                {/* ****************************************************************************** */}
                {/* Top control box */}
                <hstack width="100%" height="10%">
                    <hstack width="50%" height="100%" alignment="middle start">
                        <button size='small' icon='home' onPress={() => setPage('home')}>Home</button>
                    </hstack>
                    <hstack width="50%" height="100%" alignment="middle end">
                        <button size='small' icon='refresh' appearance='primary' onPress={generateLetterPool}>Refresh letters</button>
                    </hstack>
                </hstack>

                {/* ****************************************************************************** */}
                {/* Letter Pool box */}
                <vstack width="100%" height="20%" alignment="center middle">
                    <vstack width="100%" maxWidth={GAME_CONTAINER} height="100%">
                        <hstack width="100%" height="50%" gap="small" alignment="center middle">
                            { (lettersPool[0] ?? []).map((pool_letter: any) => (
                                <LetterTile
                                    letter={pool_letter.letter}
                                    onPress={() => handlePoolLetterClick(pool_letter)}
                                    is_selected={pool_letter.selected}
                                    is_disable={word.findIndex((el:any) => el.id === pool_letter.id) > -1}
                                />
                            ))
                            }
                        </hstack>
                        <hstack width="100%" height="50%" gap="small" alignment="center middle">
                            { (lettersPool[1] ?? []).map((pool_letter: any) => (
                                <LetterTile
                                    letter={pool_letter.letter}
                                    onPress={() => handlePoolLetterClick(pool_letter)}
                                    is_selected={pool_letter.selected}
                                    is_disable={word.findIndex((el:any) => el.id === pool_letter.id) > -1}
                                />
                            ))
                            }
                        </hstack>
                    </vstack>
                </vstack>

                {/* ****************************************************************************** */}
                {/* Timebar */}
                <vstack
                    width={timeBarWidth}
                    height='1%'
                    backgroundColor={timeBarColor}
                    cornerRadius='small'
                >
                </vstack>

                {/* ****************************************************************************** */}
                {/* Tower box */}
                <vstack width="100%" height="50%" alignment='center middle'>
                    <vstack width={GAME_CONTAINER} height='100%' backgroundColor=""  alignment="bottom center">

                        {/* User's brick */}
                        <zstack alignment="bottom center">
                            <hstack padding="xsmall" backgroundColor="gray" border='thick' width='250px' alignment='center' cornerRadius='small'>
                                <text size="xsmall" color='white' weight='bold'>SnippyMicrobe (points)</text>
                            </hstack>
                            <image
                                url="fuzzyFingers.png"
                                imageWidth={50}
                                imageHeight={80}
                                description="Generative artwork: Fuzzy Fingers"
                            />
                        </zstack>
                        {/* User's brick - ends*/}
                        <vstack alignment="bottom center" padding='xsmall'>
                            { (lexiBricks ?? []).map((tower_layer: Array<string>, index) => (
                                <hstack>
                                    {(tower_layer ?? []).map((brick: string, index: number) => (
                                        <hstack padding="xsmall" backgroundColor="white" border='thin' borderColor='gray' minWidth='80px' alignment='center' cornerRadius='small'>
                                            <text size="medium" weight='bold' color='black'>{brick}</text>
                                        </hstack>
                                    ))}
                                </hstack>
                            ))}
                        </vstack>
                    </vstack>
                </vstack>

                {/* ****************************************************************************** */}
                {/* Sandbox */}
                <vstack width="100%" height="10%" alignment="center middle">
                    <hstack width="100%" maxWidth={GAME_CONTAINER} height="100%" gap="small" alignment="center middle">
                        { (word ?? []).map((letter: any, letter_index: number) => (
                            <LetterTile
                                letter={letter.letter}
                                onPress={() => handleWordLetterClick(letter_index)}
                            />
                        ))}
                    </hstack>
                </vstack>

                {/* ****************************************************************************** */}
                {/* Bottom Control box */}
                <hstack height="10%" width="100%">
                    <hstack width="20%" height="100%" alignment="middle start">
                        <button appearance='destructive' size='small' icon='clear' onPress={clearWord} />
                    </hstack>
                    <hstack width="55%" height="100%" alignment="middle center">
                        { '' !== footerText && (
                            <hstack padding='xsmall' backgroundColor='rgb(255,255,255, 0.7)' border='thin' borderColor='yellow' cornerRadius='small'>
                                <text size='xsmall' weight='bold' color='black'>{ footerText }</text>
                            </hstack>
                        )}
                    </hstack>
                    <hstack width="25%" height="100%" alignment="middle end">
                        <button appearance='primary' size='small' onPress={checkWord}>Check</button>
                    </hstack>
                </hstack>
            </vstack>
            {/* ****************************************************************************** */}
            {/* Remaining timer clock */}
            <vstack width='100%' height='4%' alignment='middle center'>
                <hstack gap='small' alignment='center middle'>
                    <text size='small' color='black'>Time left:</text>
                    <text weight='bold' color='black'>{secondsToTimeFormat(gameTimer)}</text>
                </hstack>
            </vstack>
        </vstack>

        {/* ****************************************************************************** */}
        {/* Game completition popup */}
        { 0 === (gameTimer ?? 0) && (
            <GameCompletitionPopup
                setPage={setPage}
            />
        )}
    </zstack>
  );
};

export default PlayScreen;
