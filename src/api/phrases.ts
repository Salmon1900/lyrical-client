import axios from 'axios';
import { Phrase } from '../types/Phrase';

export const getSongPhrases = (songId: number) => axios<Phrase[]>(`/api/analysis/phrases/${songId}`, {method: 'get'})
export const createPhrase = (data: { songId: number, phrase: string }) => axios<Phrase>('/api/analysis/phrases/create', {method: 'post', data})
export const deletePhrase = (data: { songId: number, phrase: string }) => axios<void>('/api/analysis/phrases/delete', {method: 'delete', data})