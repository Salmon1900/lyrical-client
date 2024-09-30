import { useMutation } from "@tanstack/react-query";
import React from "react";
import { deleteSong as deleteSongApi } from "../../api/songs";


function useDeleteSong() {
    const { mutate: deleteSong, error, isPending} = useMutation({
        mutationKey: ['songs'],
        mutationFn: deleteSongApi
    })

    return { deleteSong, error, isPending }
}

export default useDeleteSong;