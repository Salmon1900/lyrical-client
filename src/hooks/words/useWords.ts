import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getSongs } from '../../api/songs';
import { Word } from '../../types/Word';

function useWords(songId: number | null = null) {
    const { isPending, data: songsRes, error} = useQuery({
        queryKey: ['songs'],
        queryFn: getSongs
    })

    const songs = songsRes?.data;
    let words = songs?.map(song => song.words).flat(1);
    if(songId) words = words?.filter(w => w.songId === songId)

    return { isPending, words: words || [], error}
}

export default useWords;