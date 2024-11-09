import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getSongPhrases } from '../../api/phrases';

function usePhrases(songId: number) {
    const { isPending, data: phraseRes, error} = useQuery({
        queryKey: ['phrases', songId],
        queryFn: () => getSongPhrases(songId)
    })

    const phrases = phraseRes?.data;

    return { isPending, phrases: phrases || [], error}
}

export default usePhrases;