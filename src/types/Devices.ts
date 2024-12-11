
export type DeviceObj = {
    count: number,
    items: string[]
}

export type RepetitionObj = {
  word: string,
  occurences: number
}

export type SongLiteraryDevices = {
    rhymes: DeviceObj
    repetitions: DeviceObj
    alliterations: DeviceObj,
    similies: DeviceObj,
    metaphores: DeviceObj,
}