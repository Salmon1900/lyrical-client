import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getGroups } from '../../api/groups';
import { WordGroup } from '../../types/WordGroups';

function useGroups() {
    const { isPending, data: groupRes, error} = useQuery({
        queryKey: ['groups'],
        queryFn: getGroups,
    })

    const groups = groupRes?.data || [];

    return { isPending, groups, error}
}

export default useGroups;