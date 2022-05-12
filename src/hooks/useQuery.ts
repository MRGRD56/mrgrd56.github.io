import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = <T extends object = Record<string, string>>(): T extends any[] ? never : T => {
    const { search } = useLocation();

    return useMemo(() => Object.fromEntries(new URLSearchParams(search)) as any, [search]);
};

export default useQuery;
