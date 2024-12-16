import { Devvit, useState } from '@devvit/public-api';
import { PageProps } from "../interfaces.ts";

import { GAME_CONTAINER } from "../global-constants.ts";

const RANKS_PER_PAGE = 5;

const ACTIVE_PAGE = {
    bg_color: 'white',
    text_color: 'black',
    border_color: 'black',
};

  const INACTIVE_PAGE = {
    bg_color: 'rgb(0, 0, 0, 0.3)',
    text_color: 'white',
    border_color: 'white',
};

const LeaderboardScreen = ({setPage}: PageProps) => {

    const [activeStats, setActiveStats] = useState<string>('GLOBAL');
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [topThree, setTopThree] = useState<any>([]);
    const [rankingList, setRankingList] = useState<any>([]);

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const getRankings = (page_number: number = 1) => {
    //   setTopThree(scores.slice(0, 3));
    //   setTotalPages(Math.ceil((scores.length-3)/5));

    //   setRankingList(
    //     scores.slice(3 + (RANKS_PER_PAGE * (page_number - 1)), 3 + (RANKS_PER_PAGE * (page_number)))
    //   );
    }

    const updatePageNumber = (new_page_number: number) => {
      setPageNumber( new_page_number );
      getRankings(new_page_number);
    }

    getRankings();


    // ============================================================
    // ============================================================
    return (
        <vstack height="100%" width="100%" alignment="middle center" padding="medium">
            <vstack width={GAME_CONTAINER} height='100%' gap='small'>
                {/* ******************************************************** */}
                {/* Top buttons container */}
                <hstack width='100%' height='8%'>
                    <hstack width='50%' height='100%'>
                        <hstack width='97%' height='100%' border='thick' alignment='center middle' cornerRadius='small'
                            borderColor={('GLOBAL' === activeStats) ? ACTIVE_PAGE.border_color : INACTIVE_PAGE.border_color}
                            backgroundColor={('GLOBAL' === activeStats) ? ACTIVE_PAGE.bg_color : INACTIVE_PAGE.bg_color}
                            onPress={()=>setActiveStats('GLOBAL')}
                        >
                            <text size='xlarge' weight='bold'
                                color={('GLOBAL' === activeStats) ? ACTIVE_PAGE.text_color : INACTIVE_PAGE.text_color}
                            >
                                GLOBAL
                            </text>
                        </hstack>
                    </hstack>
                    <hstack width='50%' height='100%' alignment='end middle'>
                        <hstack width='97%' height='100%' border='thick' alignment='center middle' cornerRadius='small'
                            borderColor={('in_game' === activeStats) ? ACTIVE_PAGE.border_color : INACTIVE_PAGE.border_color}
                            backgroundColor={('in_game' === activeStats) ? ACTIVE_PAGE.bg_color : INACTIVE_PAGE.bg_color}
                            onPress={()=>setActiveStats('in_game')}
                        >
                            <text size='xlarge' weight='bold'
                                color={('in_game' === activeStats) ? ACTIVE_PAGE.text_color : INACTIVE_PAGE.text_color}
                            >
                                IN GAME
                            </text>
                        </hstack>
                    </hstack>
                </hstack>
                {/* ******************************************************** */}

                <vstack width='100%' height='83%' backgroundColor='rgb(0, 0, 0, 0.0)' alignment='top center' gap='small'>
                    {/* ******************************************************** */}
                    {/* Top 3 position holders */}
                    <hstack width='100%' height='150px' alignment='center bottom' gap='small'>
                        <zstack width='80px' height='100%' alignment='center bottom'>
                            <vstack width='100%' height='70px' backgroundColor='white'>
                            </vstack>
                            <vstack width='100%' height='100%' alignment='center top'>
                                <image
                                    url="fuzzyFingers.png"
                                    imageWidth={50}
                                    imageHeight={135}
                                    description="Generative artwork: Fuzzy Fingers"
                                    />
                            </vstack>
                        </zstack>
                        <zstack width='80px' height='100%' alignment='center bottom'>
                            <vstack width='100%' height='100px' backgroundColor='white'></vstack>
                            <vstack width='100%' height='100%' alignment='center top'>
                                <image
                                    url="fuzzyFingers.png"
                                    imageWidth={50}
                                    imageHeight={70}
                                    description="Generative artwork: Fuzzy Fingers"
                                    />
                            </vstack>
                        </zstack>
                        <zstack width='80px' height='100%' alignment='center bottom'>
                            <vstack width='100%' height='60px' backgroundColor='white'></vstack>
                            <vstack width='100%' height='100%' alignment='center top'>
                                <image
                                    url="fuzzyFingers.png"
                                    imageWidth={50}
                                    imageHeight={155}
                                    description="Generative artwork: Fuzzy Fingers"
                                    />
                            </vstack>
                        </zstack>
                    </hstack>

                    {/* ******************************************************** */}
                    {/*  Remaining Leaderboard rankings */}
                    { rankingList.map((rank: any, index: number) => (
                        <hstack width='100%' height='28px' backgroundColor='rgb(0, 0, 0, 0.2)' cornerRadius='small' padding='xsmall'>
                            <text color='black'>{rank.user.username}</text>
                        </hstack>
                    ))}

                    {/* ******************************************************** */}
                    {/* Leaderboard page navigation nuttons */}
                    <hstack width='100%' height='40px'>
                        <hstack width='20%' height='40px'>
                            <button size='small' icon='left' appearance='primary'
                                onPress={() => updatePageNumber(pageNumber - 1)}
                            disabled={1 === pageNumber}
                            ></button>
                        </hstack>
                        <hstack width='60%' height='40px' alignment='center middle'>
                            <text weight='bold' color='black'>Page: {pageNumber}/{totalPages}</text>
                        </hstack>
                        <hstack width='20%' height='40px' alignment='end middle'>
                            <button size='small' icon='right' appearance='primary'
                                onPress={() => updatePageNumber(pageNumber + 1)}
                            disabled={totalPages === pageNumber}
                            ></button>
                        </hstack>
                    </hstack>
                </vstack>

                {/* ******************************************************** */}
                {/* Bottom buttons container */}
                <hstack width='100%' height='9%'>
                    <button appearance='media' icon='home' width='100%'
                        onPress={() => setPage('home')}>Back to home</button>
                </hstack>
                {/* ******************************************************** */}
            </vstack>
        </vstack>
    );
};

export default LeaderboardScreen;
