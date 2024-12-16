import { Devvit } from '@devvit/public-api';
import { PageProps } from "../interfaces.ts";

const HomeScreen = ({setPage}: PageProps) => {
    return (
        <>
        <image
            url="fuzzy-fingers.png"
            imageWidth={200}
            imageHeight={230}
            description="Generative artwork: Fuzzy Fingers"
        />
        <button width='100%' maxWidth='200px' appearance='primary' onPress={() => setPage('play')}>Play</button>
        <button width='100%' maxWidth='200px' appearance='bordered' onPress={() => setPage('how_to_play')}>How to play?</button>
        <button width='100%' maxWidth='200px' appearance='success' onPress={() => setPage('leaderboard')}>Leaderboard</button>
        </>
    );
};

export default HomeScreen;
