// Learn more at developers.reddit.com/docs
import { Devvit, useState } from '@devvit/public-api';

Devvit.configure({
    redditAPI: true,
    kvStore: true, // For enabling key-value storage.
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
    name: 'LexiTowers',
    height: 'regular',
    render: (_context) => {
        // State to hold the list of usernames
        const [usernameList, setUsernameList] = useState<string[]>(async () => {
            try {
                // Fetch usernames from KV Store
                const stored_usernames = (await _context.kvStore.get(`post-${_context.postId}-usernames`)) ?? [];
                // Ensure it's an array of strings
                if (Array.isArray(stored_usernames)) {
                    return stored_usernames as string[];
                }
                return [];
            } catch (error) {
                console.error('Error fetching usernames from KV Store:', error);
                return [];
            }
        });

        // Handler for button click
        const handleButtonClick = async () => {
            try {
                if (!_context.userId) {
                    throw new Error('User ID is undefined.');
                }

                // Fetch the user's details
                const user_details = await _context.reddit.getUserById(_context.userId);
                const new_username = user_details?.username;

                if (new_username) {
                    // Add the new username to the list
                    const updated_usernames = [...(usernameList || []), new_username];

                    // Update state and persist to KV Store
                    setUsernameList(updated_usernames);
                    await _context.kvStore.put(`post-${_context.postId}-usernames`, updated_usernames);
                }
            } catch (error) {
                console.error('Error handling button click:', error);
            }
        };

        // Render the UI
        return (
            <vstack height="100%" width="100%" gap="small" alignment="center middle" backgroundColor="#eeeee4" padding="small" >
                <vstack height="25%" width="100%" backgroundColor="#0A1416" cornerRadius="small" padding="xsmall" >
                    <text>Letter pool</text>
                </vstack>

                <hstack height="75%" width="100%" gap="small">
                    <TeamArea>
                        <text>Team-A</text>
                        <button onPress={handleButtonClick}>Click Me</button>
                    </TeamArea>

                    <TeamArea>
                        <text>Team-B</text>
                        {usernameList.map((username, index) => (
                            <text>{username}</text>
                        ))}
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
