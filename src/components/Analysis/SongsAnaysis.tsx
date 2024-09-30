import React, { useState } from 'react';
import { Song } from '../../types/Song';

interface ISongsAnalysisProps {
    songs: Song[]
}

const SongsAnalysis = ({ songs, }: ISongsAnalysisProps) => {
    return <h1>Analysis for songs: {songs.join(', ')}</h1>

}

export default SongsAnalysis;