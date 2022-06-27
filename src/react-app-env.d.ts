/// <reference types="react-scripts" />

declare const __DEV__: never;

declare type RawLoaded = {
    default: string;
};

declare module '!raw-loader!*' {
    const contents: string;
    export = contents;
}
