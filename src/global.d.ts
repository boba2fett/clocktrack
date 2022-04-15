/// <reference types="svelte" />

export interface Settings {
    urlRules: UrlRule[],
    timeRecordings: TimeRecord[],
    navisionSupport: boolean,
    fallbackType: string,
}

export interface TimeRecord {
    lastStartTime: Date,
    lastEndTime: Date,
    timeSeconds: number,
    task: string,
    type: string,
}

export interface UrlRule {
    baseUri: string,
    regex: string,
    type: string,
}

export interface Predefined {
    name: string,
    regex: string
}