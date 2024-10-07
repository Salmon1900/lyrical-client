import { Song } from "./Song";
import { Word } from "./Word";

export interface SongResponse extends Song {
    words: Word[]
}