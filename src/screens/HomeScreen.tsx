import { Devvit } from '@devvit/public-api';
import { PageProps } from "../interfaces.ts";

const HomeScreen = ({setPage}: PageProps) => {
    return (
        <vstack width='100%' height='90%' alignment='center middle'>
            <image
                url="lexi-tower-logo.png"
                imageWidth={220}
                imageHeight={200}
                description="Generative artwork: Fuzzy Fingers"
            />
            <vstack width='100%' gap='small' alignment='center middle'>
                <button width='100%' maxWidth='200px' appearance='primary' onPress={() => setPage('play')}>Play</button>
                <button width='100%' maxWidth='200px' appearance='media'  onPress={() => setPage('how_to_play')}>How to play?</button>
                <button width='100%' maxWidth='200px' appearance='success' onPress={() => setPage('leaderboard')}>Leaderboard</button>
            </vstack>
        </vstack>
    );
};

export default HomeScreen;
