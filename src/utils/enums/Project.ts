export enum Project {
    LilNouns = 'LilNouns',
    Nouns = 'Nouns',
}

export const projects = Object.values(Project);

export function isProject(value: unknown): value is Project {
    return typeof value === 'string' && (projects as string[]).includes(value);
}
