import { SongLiteraryDevices } from "./Devices";
import { Song } from "./Song";

export type AnalysisSelectionType = "Songs" | "Artist"
export type SongStats = {
    songId: number,
    avgWordsPerVerse: number,
    avgWordsPerLine: number,
    avgWordLength: number,
}



export type SongInfoItem = {
    type: 'avrage' | 'count' | 'text',
    value: number | string,
    description: string,
    popover?: boolean,
    popoverContent?: JSX.Element
} 

export interface AnalyzedSong extends Song {
    stats: SongStats,
    devices: SongLiteraryDevices
}