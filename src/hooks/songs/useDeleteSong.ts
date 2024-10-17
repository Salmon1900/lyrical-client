import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteSong as deleteSongApi } from "../../api/songs";


function useDeleteSong() {
    const queryClient = useQueryClient();

    const { mutate: deleteSong, error, isPending} = useMutation({
        mutationFn: deleteSongApi,
        onSettled: () => queryClient.invalidateQueries({
            queryKey: ['songs']
        }),
    })

    return { deleteSong, error, isPending }
}

export default useDeleteSong;