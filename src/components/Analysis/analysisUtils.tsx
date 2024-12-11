import { AnalyzedSong, SongInfoItem } from "../../types/Analysis";

export const getAvragesInfoItems = (song: AnalyzedSong): SongInfoItem[] => ([{
    type: 'avrage',
    description: 'Average Words per Verse',
    value: song.stats.avgWordsPerVerse,
  }, {
    type: 'avrage',
    description: 'Average Words per Line',
    value: song.stats.avgWordsPerLine,
  }, {
    type: 'avrage',
    description: 'Average Word Length',
    value: song.stats.avgWordLength,
  }])

export const getDevicesInfoItems = (song: AnalyzedSong): SongInfoItem[] => ([{
    type: 'count',
    description: 'Rhymes',
    value: song.devices.rhymes.count,
    popover: !!song.devices.rhymes.count,
    popoverContent: <div>{song.devices.rhymes.items.map(s => <p>{s}</p>)}</div>
  },{
    type: 'count',
    description: 'Alliterations',
    value: song.devices.alliterations.count,
    popover: !!song.devices.alliterations.count,
    popoverContent: <div>{song.devices.alliterations.items.map(s => <p>{s}</p>)}</div>
  },
  {
    type: 'count',
    description: 'Similies',
    value: song.devices.similies.count,
    popover: !!song.devices.similies.count,
    popoverContent: <div>{song.devices.similies.items.map(s => <p>{s}</p>)}</div>
  },
  {
    type: 'count',
    description: 'Metaphores',
    value: song.devices.metaphores.count,
    popover: !!song.devices.metaphores.count,
    popoverContent: <div>{song.devices.metaphores.items.map(s => <p>{s}</p>)}</div>
  },
  {
    type: 'count',
    description: 'Repeating Words',
    value: song.devices.repetitions.count,
    popover: !!song.devices.repetitions.count,
    popoverContent: <div>{song.devices.repetitions.items.map(s => <p>{s}</p>)}</div>
  },
])

