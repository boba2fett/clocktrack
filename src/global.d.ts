/// <reference types="svelte" />

export interface Settings {
    urlRules: {
        baseUri: string,
        regex: string,
    }[],
}