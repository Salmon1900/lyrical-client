import React, { useState } from 'react';
import { Song } from '../../types/Song';
import SongAveragesCard from './SongAverages';

interface ISongsAnalysisProps {
    songs: Song[]
}

const SongsAnalysis = ({ songs, }: ISongsAnalysisProps) => {
    return (
    <div>
        <h1>Analysis for songs: {songs.map(s => s.name).join(', ')}</h1>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
            {songs.map(s => <SongAveragesCard song={s}/>)}
            {songs.map(s => <SongAveragesCard song={s}/>)}
            {songs.map(s => <SongAveragesCard song={s}/>)}
            {/* {songs.map(s => <SongAveragesCard song={s}/>)} */}
            {/* {songs.map(s => <SongAveragesCard song={s}/>)} */}
            {/* {songs.map(s => <SongAveragesCard song={s}/>)} */}
            {/* {songs.map(s => <SongAveragesCard song={s}/>)} */}

        </div>
        {/* <p>Avrage words per song (words/song)</p>
        <p>Avrage words per verse (words/verse)</p>
        <p>Avrage words per line (words/line)</p>
        <p>Avrage words length (letter/word)</p> */}
        <h1>Literary devices</h1>
        <p>Number of rhymes per verse (rhyme/verse)</p>
        <p>Number of rhymes per verse (rhyme/verse)</p>
    </div> )

}

export default SongsAnalysis;