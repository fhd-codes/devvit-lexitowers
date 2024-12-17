import { Devvit } from '@devvit/public-api';

const LoadingScreen = () => {
    return (
        <vstack height="100%" width="100%" alignment="middle center" backgroundColor="#f0f0f0" padding="medium">
            <image
                url="lexi-tower-logo.png"
                imageWidth={220}
                imageHeight={200}
                description="LexiTower logo"
            />
            <spacer size="small" />
            <text size="large" weight="bold" color="#444">Creating your post...</text>
            <spacer size="small" />
            <text size="small" color="#666">Please wait while we load LexiTower.</text>
            <spacer size="medium" />
            <icon name="load" size="large" />
        </vstack>
    );
};

export default LoadingScreen;
