import axios from 'axios';

export const getSongsStats = (songIds: number[]) => axios<any>('/api/anaysis/avrages', { data: { songIds }})