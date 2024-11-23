// Learn more at developers.reddit.com/docs
import { Devvit, useState } from '@devvit/public-api';

Devvit.configure({
    redditAPI: true,
});

// Add a menu item to the subreddit menu for instantiating the new experience post
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
            // The preview appears while the post loads
            preview: (
                <vstack height="100%" width="100%" alignment="middle center">
                    <text size="large">Loading...</text>
                </vstack>
            ),
        });
        ui.showToast({ text: 'Created post!' });
    },
});

// Add a post type definition
Devvit.addCustomPostType({
    name: 'Experience Post',
    height: 'regular',
    render: (_context) => {

        return (
            <vstack height='100%' width='100%' gap='small' alignment='center middle' backgroundColor='#eeeee4' padding='small'>
                {/* Letter pool area */}
                <vstack height='25%' width='100%' backgroundColor='#0A1416' cornerRadius='small' padding='xsmall'>
                    <text>Letter pool</text>
                </vstack>

                <hstack height='75%' width='100%' gap='small'>
                    <TeamArea>
                        <text>Team-A</text>
                    </TeamArea>
                    <TeamArea>
                        <text>Team-B</text>
                    </TeamArea>
                </hstack>
            </vstack>
        );
    },
});

export default Devvit;

// ====================================================================================
// Aux components
// ====================================================================================
const TeamArea = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    return (
        <vstack height='100%' width='50%' backgroundColor='#0A1416' cornerRadius='small' padding='xsmall'>
            {children}
        </vstack>
    );
};
