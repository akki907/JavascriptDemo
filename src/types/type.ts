export interface PromiseState {
    id: number;
    status: 'pending' | 'fulfilled' | 'rejected';
    duration: number;
    speed: number;
    error?: string;
}

export interface PromiseConfig {
    id: number;
    duration: number;
    succeeds: boolean;
}

export interface CustomConfig {
    totalPromises: number;
    baseDelay: number;
}

export interface Stats {
    'Total Promises': number;
    'Completed': number;
    'Success Rate': string;
    'Average Duration': string;
    'Failed': number;
}

export type PromiseMethod = 'all' | 'allSettled' | 'race' | 'any';