import { Devvit, useState, useInterval } from '@devvit/public-api';

import { PageProps } from "../interfaces.ts";
import { GAME_CONTAINER } from "../global-constants.ts";

const GameCompletitionPopup = ({setPage}: PageProps) => {

    // - - - - - - - - - - - - - - - - - - - - - - - - -

    // ==================================================
    // ==================================================
    return(
        <zstack width='100%' height='100%' backgroundColor='rgba(0, 0, 0, 0.7)' cornerRadius='medium' alignment='center middle'>
            <vstack width={GAME_CONTAINER} height='70%' backgroundColor='white' border='thick' cornerRadius='medium' gap='medium' alignment='center top'>
                <zstack alignment="bottom center">
                    <hstack padding="xsmall" backgroundColor="gray" border='thick' width='250px' alignment='center' cornerRadius='small'>
                        <text size="large" color='white' weight='bold'>SnippyMicrobe</text>
                    </hstack>
                    <image
                        url="fuzzyFingers.png"
                        imageWidth={150}
                        imageHeight={160}
                        description="Generative artwork: Fuzzy Fingers"
                    />
                </zstack>
                <hstack>
                    <text size='xxlarge' weight='bold'>TIME UP!</text>
                </hstack>
                <vstack gap='small' height='65px'>
                    <hstack gap='small' alignment='center middle'>
                        <text size='large'>Your game score:</text>
                        <text size='large' weight='bold'>123</text>
                    </hstack>
                    <hstack gap='small' alignment='center middle'>
                        <text size='large'>Average time per word:</text>
                        <text size='large' weight='bold'>10 secs</text>
                    </hstack>
                </vstack>
                <vstack gap='small'>
                    <hstack gap='small' alignment='center middle'>
                        <button icon="home" appearance='primary' width='75px' onPress={() => setPage('home')}></button>
                        <button appearance='success' onPress={() => setPage('leaderboard')}>See Leaderboard</button>
                    </hstack>
                </vstack>
            </vstack>
        </zstack>
    );
};

export default GameCompletitionPopup;
