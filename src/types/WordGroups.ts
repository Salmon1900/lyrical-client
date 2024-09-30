import { Word } from "./Word"

export type WordGroup = {
    id: number
    name: string,
    words: Omit<Word, 'location' | 'numInLine' | 'song_id' | 'verse' | 'line'>[]
}
