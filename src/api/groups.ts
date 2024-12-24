import axios from 'axios';
import { WordGroup } from '../types/WordGroups';

export const getGroups = () => axios<WordGroup[]>('/api/groups', {method: 'get'})
export const createGroup = (data: { name: string}) => axios<number>('/api/groups', {method: 'post', data})
export const deleteGroup = (groupId: number) => axios<number>(`/api/groups/${groupId}`, {method: 'delete'})
export const addWordToGroup = (data: { groupId: number, word: string }) => axios<void>('/api/groups/add-word', {method: 'put', data})
export const deleteWordFromGroup = (data: { groupId: number, word: string }) => axios<void>('/api/groups/delete-word', {method: 'delete', data})