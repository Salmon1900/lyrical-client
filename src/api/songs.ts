import axios from "axios"
import { Song } from "../types/Song"
import { Word } from "../types/Word"
import { SongResponse } from "../types/Api"

const getSongs = () => axios<SongResponse[]>('/api/songs', {method: 'get'})

const addSong = (data: { song: Song, words: Word[] }) => axios('/api/songs/upload', {method: 'post', data})

const deleteSong = (songId: number) => axios(`/api/songs/${songId}`, {method: 'delete'})


export { getSongs, addSong, deleteSong }