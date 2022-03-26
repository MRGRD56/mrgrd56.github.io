export interface DevProject {
    repoUrl?: string;
    appUrl?: string;
    logo?: string;
    name: string;
    id: number | string;
    description?: string;
}

export interface GithubDevProject extends DevProject {
    stars?: number;
}
