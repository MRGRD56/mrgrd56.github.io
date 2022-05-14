import { createContext, Dispatch, SetStateAction } from 'react';

export interface RouteContextType {
    title: string;
}

const RouteContext = createContext<[RouteContextType, Dispatch<SetStateAction<RouteContextType>>]>([] as any);

export default RouteContext;
