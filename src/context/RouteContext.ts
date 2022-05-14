import { createContext, Dispatch, SetStateAction } from 'react';

export interface RouteContextState {
    title: string;
}

export interface RouteContextMeta {
    isInitialized: boolean;
}

export interface RouteContextType {
    state: [RouteContextState, Dispatch<SetStateAction<RouteContextState>>];
    meta: [RouteContextMeta, Dispatch<SetStateAction<RouteContextMeta>>];
}

const RouteContext = createContext<RouteContextType>({} as any);

export default RouteContext;
