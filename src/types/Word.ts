export type Word = {
    id: number,
    name: string,
    location: number,
    lineLocation: number,
    verse: number,
    line: number
    songId: number,
    songName?: string
}

export type WordFilters = {
    ids?: number[],
    songIds?: number[],
    text?: string,
    verse?: number,
    line?: number
}

// export type WordLocation = Omit<Word, "name", ''>