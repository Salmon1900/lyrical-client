import { SeperatedLyrics } from "../../types/Seperated";
import { Word } from "../../types/Word";

export const formatSongFromLyrics = (words: Word[]): SeperatedLyrics => {
    const seperatedLyrics: SeperatedLyrics = words.reduce((obj, word) => {
      const { verse, line, lineLocation, name } = word;
  
      if (!obj[verse]) obj[verse] = [];
      if (!obj[verse][line]) obj[verse][line] = [];
  
      obj[verse][line][lineLocation] = name;
  
      return obj;
    }, [] as any);
  
    return seperatedLyrics;
  };