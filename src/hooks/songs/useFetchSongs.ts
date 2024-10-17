import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getSongs } from '../../api/songs';

function useFetchSongs() {
    const { isPending, data: songsRes, error} = useQuery({
        queryKey: ['songs'],
        staleTime: 10000,
        queryFn: getSongs
    })

    const songs = songsRes?.data;

    return { isPending, songs, error}
}

export default useFetchSongs;