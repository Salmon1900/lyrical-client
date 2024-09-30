import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getSongs } from '../../api/songs';

function useFetchSongs() {
    const { isPending, data: songs, error} = useQuery({
        queryKey: ['songs'],
        queryFn: getSongs
    })

    return { isPending, songs, error}
}

export default useFetchSongs;