import { useMutation } from "@tanstack/react-query";
import React from "react";
import { addSong as addSongApi } from "../../api/songs";


function useAddSong() {
    const { mutate: addSong, error, isPending} = useMutation({
        mutationKey: ['songs'],
        mutationFn: addSongApi
    })

    return { addSong, error, isPending }
}

export default useAddSong;