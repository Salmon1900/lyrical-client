const simpleSongLyrics = `Well this is just a simple song
To say what you done
I told you about all those fears
And away they did run
You sure must be strong
And you feel like an ocean
Being warmed by the sun

When I was just nine years old
I swear that I dreamed
Your face on a football field
And a kiss that I kept
Under my vest
Apart from everything
But the heart in my chest

I know that things can really get rough when you go it alone
Don't go thinking you gotta be tough, to play like a stone
Could be there's nothing else in our lives so critical
As this little hole

My life in an upturned boat, marooned on a cliff
You brought me a great big flood
And you gave me a lift
To care, what a gift
You tell me with your tongue
And your breath was in my lungs
And you float over the rift

I know that things can really get rough when you go it alone
Don't go thinking you gotta be tough, to play like a stone
Could be there's nothing else in our lives so critical
As this little hole

Well this will be a simple song
To say what you've done
I told you about all those years
And away they did run
You sure must be strong
And you feel like an ocean
Being warmed by the sun

Remember walking a mile to your house, a glow in the dark
I made a fumblin' play for your heart and the extra, the spark
You wore a charm in the chain that I stole especially for you
Love's such a delicate thing that we do, we've nothing to prove
Which I never knew`;

const wordList = [];
let totalIndex = 0;

simpleSongLyrics.split("\n\n").forEach((verse, vIndex) => {
  verse.split("\n").forEach((line, lIndex) => {
    line.split(" ").forEach((word, wIndex) => {
      wordList.push({
        id: totalIndex,
        name: word,
        verse: vIndex,
        line: lIndex,
        lineLocation: wIndex,
        location: totalIndex,
        songId: 1
      });
      totalIndex++;
    });
  });
});

console.log(wordList);
