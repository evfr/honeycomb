export interface iUser {
    name: string,
    pass: string
}

export interface iForm {
    name: string,
    address: string,
    day: number,
    month: number,
    year: number,
    activities: iActivity[],
    favouriteActivity: iActivity
}

type ActivityType = 'Reading' | 'Walking' | 'Music' | 'Other';

export interface iActivity {
    name: ActivityType,
    additionalField?: string
}

export interface iPDFServiceResult {
    filename: string,
    bytes: Buffer
}

