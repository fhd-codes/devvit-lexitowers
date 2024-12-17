export interface PageProps {
    setPage: (page: string) => void;
    context?: any;
}
export interface LetterTileProps {
    letter: string;
    is_disable?: boolean; // Not needed for the assembled word.
    is_selected?: boolean; // Not needed for the assembled word.
    onPress: () => void;
}
