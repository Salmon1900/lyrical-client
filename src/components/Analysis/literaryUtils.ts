import { DeviceObj, RepetitionObj } from "../../types/Devices";
import { Word } from "../../types/Word";
import { formatSongFromLyrics } from "../Words/wordUtils";

const songLyrics = `
  You are like the sunshine, bright and warm,
  Your love is a fire, burning in my heart.
  Dancing in the dark, we find the light,
  Always and forever, we’ll be alright.
  She sells sea shells by the seashore,
  And echoes of love ring evermore.
`;


export function findSimiles(songWords: Word[]): DeviceObj {
  let similesCount = 0;
  let similes: string[] = [];
  const seperatedLyrics = formatSongFromLyrics(songWords);
  const similePattern = /\blike\b|\bas\b/g;

  seperatedLyrics.forEach(verse => {
    verse.forEach(line => {
      const textLine = line.join(' ');
      const matches = textLine.match(similePattern);
      if(matches){
        similesCount += matches.length;
        similes.push(textLine);
      }
    })
  })

  return {
    count: similesCount,
    items: similes
  }
}

export function findMetaphors(songWords: Word[]): DeviceObj {
  let metaphoresCount = 0;
  let metaphores: string[] = [];
  const seperatedLyrics = formatSongFromLyrics(songWords);
  const metaphorPattern = /\b(is|are|was|were)\b.+\b(a|an|the)\b/g;

  seperatedLyrics.forEach(verse => {
    verse.forEach(line => {
      const textLine = line.join(' ');
      const matches = textLine.match(metaphorPattern);
      if(matches){
        metaphoresCount += matches.length;
        metaphores.push(textLine);
      }
    })
  })

  return {
    count: metaphoresCount,
    items: metaphores
  }
}

export function findAlliterations(songWords: Word[]): DeviceObj {
  let alliterationsCount = 0;
  let alliterations: string[] = [];
  const seperatedLyrics = formatSongFromLyrics(songWords);
  const alliterationPattern = /\b([a-z])([a-z]*)\b\s+\b\1([a-z]*)\b/gi;

  seperatedLyrics.forEach(verse => {
    verse.forEach(line => {
      const textLine = line.join(' ');
      const matches = textLine.match(alliterationPattern);
      if(matches){
        const validMatches = matches.filter(s => {
          const [first, second] = s.split(" ");
          return first.toLowerCase() !== second.toLowerCase() 
        })
        alliterationsCount += validMatches.length;
        alliterations.push(...validMatches);
      }
    })
  })

  return {
    count: alliterationsCount,
    items: alliterations
  }
}

export function findRepetitions(songWords: Word[]): DeviceObj {
  let repetitions: RepetitionObj[] = [];
  const wordCounts = songWords.reduce((acc: any, word) => {
    acc[word.name] = (acc[word.name] || 0) + 1;
    return acc;
  }, {});

  Object.keys(wordCounts).forEach(word => {
    if(wordCounts[word] > 1){
      repetitions.push({ word, occurences: wordCounts[word] })
    }
  });
  repetitions.sort((r1, r2) => r2.occurences - r1.occurences);
  return {
    count: repetitions.length,
    items: repetitions.map(r => `${r.word} - ${r.occurences} times`)
  }
}

const getEnding = (word: string, length = 3) => word.slice(-length).toLowerCase();

export const findRhymesPairs = (songWords: Word[]) => {
  let rhymeCount = 0;
  let rhymes: string[] = [];
  const seperatedLyrics = formatSongFromLyrics(songWords);
  seperatedLyrics.forEach(verse => {
    const lineCount = verse.length;
    for (let i = 0; i < lineCount; i++) {
      for (let j = i + 1; j < lineCount; j++) {
        const iLine = verse[i];
        const jLine = verse[j];
        const iLastWord = iLine[iLine.length - 1];
        const jLastWord = jLine[jLine.length - 1];

        if(iLastWord !== jLastWord && getEnding(iLastWord) === getEnding(jLastWord)){
          rhymeCount++
          rhymes.push(`${iLastWord} - ${jLastWord}`)
        }
        
      }
      
    }
  })

  return {
    count: rhymeCount,
    items: rhymes
  }
}

// analyzeSong(songLyrics);
