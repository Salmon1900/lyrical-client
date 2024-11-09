const songLyrics = `
  You are like the sunshine, bright and warm,
  Your love is a fire, burning in my heart.
  Dancing in the dark, we find the light,
  Always and forever, we’ll be alright.
  She sells sea shells by the seashore,
  And echoes of love ring evermore.
`;

export function findSimiles(text: string) {
  const similePattern = /\blike\b|\bas\b/g;
  return text.match(similePattern) ? "Simile found" : "No similes found";
}

export function findMetaphors(text: string) {
  const metaphorPattern = /\b(is|are|was|were)\b.+\b(a|an|the)\b/g;
  const matches = text.match(metaphorPattern);
  return matches ? `Metaphor found: ${matches.join(', ')}` : "No metaphors found";
}

export function findAlliterations(text: string) {
  const alliterationPattern = /\b([a-z])([a-z]*)\b\s+\b\1([a-z]*)\b/gi;
  const matches = text.match(alliterationPattern);
  return matches ? `Alliteration found: ${matches.join(', ')}` : "No alliterations found";
}

export function findRepetitions(text: string) {
  const words = text.toLowerCase().split(/\W+/);
  const wordCounts = words.reduce((acc: any, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});

  const repeatedWords = Object.keys(wordCounts).filter(word => wordCounts[word] > 1);
  return repeatedWords.length > 0 ? `Repeated words: ${repeatedWords.join(', ')}` : "No repetitions found";
}

export function findRhymes(text: string) {
    const lines = text.split(/\n+/).filter(line => line.trim()); // Split by lines and filter out empty lines
    const wordsAtLineEnds = lines.map(line => {
      const words = line.trim().split(/\s+/);
      return words[words.length - 1]; // Get the last word in each line
    });
  
    const rhymePairs = [];
  
    // Function to extract the last part of a word (for rhyme detection)
    const getEnding = (word: string, length = 3) => word.slice(-length).toLowerCase();
  
    for (let i = 0; i < wordsAtLineEnds.length; i++) {
      for (let j = i + 1; j < wordsAtLineEnds.length; j++) {
        if (getEnding(wordsAtLineEnds[i]) === getEnding(wordsAtLineEnds[j])) {
          rhymePairs.push([wordsAtLineEnds[i], wordsAtLineEnds[j]]);
        }
      }
    }
  
    return rhymePairs.length > 0 
      ? `Rhyming pairs found: ${rhymePairs.map(pair => pair.join(" and ")).join(', ')}`
      : "No rhymes found";
  }

function analyzeSong(song: string) {
  console.log(findSimiles(song));
  console.log(findMetaphors(song));
  console.log(findAlliterations(song));
  console.log(findRepetitions(song));
}

// analyzeSong(songLyrics);
