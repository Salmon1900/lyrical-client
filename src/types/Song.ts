import { Word } from "./Word"

export type Song = {
    id: number,
    name: string,
    artist: string,
    genre: string,
}

export interface SongExpanded extends Song {
    words: Word[]
}