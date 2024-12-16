import { Devvit } from '@devvit/public-api';
import { LetterTileProps } from "../interfaces.ts";

const LetterTile = ({letter, is_disable, is_selected, onPress}: LetterTileProps) => {
    return (
        <hstack padding="xsmall" width="40px" height="40px" backgroundColor={is_selected ? "#FEEDE5" : is_disable ? "#80808033" : "white"} alignment="center middle" cornerRadius="small"
            onPress={is_disable ? undefined : onPress}
        >
            <text size="xxlarge" weight="bold" alignment="center middle" color={is_disable ? '#808080' : "red"}>
                {letter}
            </text>
        </hstack>
    )
}

export default LetterTile;
