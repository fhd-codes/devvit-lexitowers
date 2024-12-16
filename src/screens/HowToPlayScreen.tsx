import { Devvit } from '@devvit/public-api';
import { PageProps } from "../interfaces.ts";

import { GAME_CONTAINER } from "../global-constants.ts";

const HowToPlayScreen = ({setPage}: PageProps) => {
    return (
        <vstack height="100%" width="100%" alignment="middle center" padding="medium">
            <vstack height="100%" width={GAME_CONTAINER} alignment="middle center" gap='small'>
                {/* ------ Top buttons container ------ */}
                <hstack width='100%' height='8%'>
                    <button icon='home' size='small' onPress={()=>setPage('home')}>Home</button>
                </hstack>

                {/* ------ Steps info section ------ */}
                <hstack width='100%' height='82%'>
                    <vstack width='100%' backgroundColor='white' border='thin' borderColor='green' cornerRadius='medium'>
                        <text>Steps will be shown here.</text>
                    </vstack>
                </hstack>

                {/* ------ Steps navigation buttons container ------ */}
                <hstack width='100%' height='10%'>
                    <hstack width='50%' height='100%' alignment='start middle'>
                        <button icon='left' appearance='success' />
                    </hstack>

                    <hstack width='50%' height='100%' alignment='end middle'>
                        <button icon='right' appearance='success' />
                    </hstack>
                </hstack>
                {/* ------------- */}
            </vstack>
        </vstack>
    );
};

export default HowToPlayScreen;
