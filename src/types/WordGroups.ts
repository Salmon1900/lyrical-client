import { Word } from "./Word"

export type WordGroup = {
    id: number
    name: string,
    words: Omit<Word, 'location' | 'lineLocation' | 'songId' | 'verse' | 'line'>[]
}
