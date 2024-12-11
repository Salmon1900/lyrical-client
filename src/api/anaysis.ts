import axios from 'axios';
import { SongStats } from '../types/Analysis';

export const getSongsStats = (songIds: number[]) => axios<SongStats[]>('/api/songs/statistics', { data: songIds , method: 'post'})