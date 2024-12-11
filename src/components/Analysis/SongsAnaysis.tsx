import React, { useEffect, useState } from 'react';
import { Song } from '../../types/Song';
import { AnalyzedSong } from '../../types/Analysis';
import SongInfoCard from './SongInfoCard';
import { getAvragesInfoItems, getDevicesInfoItems } from './analysisUtils';

interface ISongsAnalysisProps {
    songs: AnalyzedSong[]
}

const SongsAnalysis = ({ songs, }: ISongsAnalysisProps) => {
    return (
    <div>
        <h1>Analysis for songs: {songs.map(s => s.name).join(', ')}</h1>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
            {songs.map(s => <SongInfoCard songName={s.name} artist={s.artist} infoItems={getAvragesInfoItems(s)}/>)}
            {/* {songs.map(s => <SongStatsCard song={s}/>)} */}
        </div>
        <h1>Literary devices</h1>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
            {songs.map(s => <SongInfoCard songName={s.name} artist={s.artist} infoItems={getDevicesInfoItems(s)}/>)}
        </div>
    </div> )

}

export default SongsAnalysis;