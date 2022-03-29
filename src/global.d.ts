/// <reference types="svelte" />

export interface Settings {
    urlRules: UrlRule[],
    timeRecordings: TimeRecord[],
}

export interface TimeRecord {
    startTime: Date,
    endTime: Date,
    task: string,
}

export interface UrlRule {
    baseUri: string,
    regex: string,
}

export interface Predefined {
    name: string,
    regex: string,
}