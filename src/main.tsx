// Learn more at developers.reddit.com/docs
import { Devvit, useState } from '@devvit/public-api';

import LoadingScreen from "./screens/LoadingScreen.tsx";
import HomeScreen from "./screens/HomeScreen.tsx";
import PlayScreen from "./screens/PlayScreen.tsx";
import HowToPlayScreen from "./screens/HowToPlayScreen.tsx";
import LeaderboardScreen from "./screens/LeaderboardScreen.tsx";

Devvit.configure({
    redditAPI: true,
    // TODO: Add redis support here.
});

// Adding a menu item to the subreddit menu for instantiating the new LexiTower post
Devvit.addMenuItem({
    label: 'Add LexiTowers Game',
    location: 'subreddit',
    forUserType: 'moderator',
    onPress: async (_event, context) => {
        const { reddit, ui } = context;
        const subreddit = await reddit.getCurrentSubreddit();
        await reddit.submitPost({
            title: 'LexiTower by fhd-codes!',
            subredditName: subreddit.name,
            /* The preview appears while the post loads.
             * Make change and add new post to see its change.
            */
            preview: ( <text>Loading</text> ),
        });
        ui.showToast({ text: 'Created post!' });
    },
});

// Adding LexiTower post type definition
Devvit.addCustomPostType({
    name: 'LexiTowers',
    height: 'tall',
    render: (_context) => {
        const [page, setPage] = useState('home');

        let current_page;
        // - - - - - - - - - - - - - - - - - - - - - - - - - - - -

        switch (page) {
            case 'home':
                current_page = <HomeScreen setPage={setPage} />;
                break;
            case 'play':
                current_page = <PlayScreen setPage={setPage} />;
                break;
            case 'how_to_play':
                current_page = <HowToPlayScreen setPage={setPage} />;
                break;
            case 'leaderboard':
                current_page = <LeaderboardScreen setPage={setPage} />;
                break;
            default:
                current_page = <HomeScreen setPage={setPage} />;
        }

        // ========================================================
        // ========================================================
        return (
            <zstack width="100%" height="100%" alignment="top start">
                <image
                    imageHeight={1103}
                    imageWidth={1800}
                    height="100%"
                    width="100%"
                    url="background.png"
                    description="Pixelated sky background"
                    resizeMode="cover"
                />

                <vstack height="100%" width="100%" gap='small' alignment="top center">
                    {current_page ?? 'home'}
                </vstack>
            </zstack>
        );
    },
});

export default Devvit;
