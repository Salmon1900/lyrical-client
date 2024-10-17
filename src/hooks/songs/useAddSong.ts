import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { addSong as addSongApi } from "../../api/songs";


function useAddSong() {
    const queryClient = useQueryClient();
    const { mutate: addSong, error, isPending} = useMutation({
        // mutationKey: ['songs'],
        mutationFn: addSongApi,
        onSettled: () => queryClient.invalidateQueries({
            queryKey: ['songs']
        }),
    })

    return { addSong, error, isPending }
}

export default useAddSong;