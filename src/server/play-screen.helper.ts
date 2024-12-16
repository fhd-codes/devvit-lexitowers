import shortUUID from 'short-uuid';

const POOL_ROW_LENGTH = 5;

export const generateRandomLetters = () => {
    /**
     * This function will generate an array of objects which contains:
     * - a random letter     - unique id
     * - a boolean to see if the letter is selected or not  - score (1 OR 2 points)
     * For 90% of the time, the score will be 1 point.
    */
    return Array.from({ length: POOL_ROW_LENGTH }, (_, index) => {
        const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Generate a random uppercase letter
        return {
            letter, // Already uppercase
            id: shortUUID.generate(), // Unique identifier
            selected: false,
            score: Math.random() < 0.90 ? 1 : 2, // Randomly assigning score points
        };
    });
}

export const secondsToTimeFormat = (seconds: number) => {
    /**
     * This function takes the number of seconds and generate a time string
     * in MM:SS format.
     * Like `120` secs will become '02:00'.
    */
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
