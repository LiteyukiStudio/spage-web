export interface User {
    id: number;
    name: string;
    display_name: string;
    email: string;
    description: string;
    avatar_url: string;
    role: string;
    organization: string;
    language: string;
}

export interface Project {
    id: number;
    name: string;
    display_name: string;
    description: string;
    owner_type: string;
    owner_id: number;
    owners: Array<User>;
    site_limit: number;
}

export interface Organization {
    id: number;
    name: string;
    display_name: string;
    email: string;
    description: string;
    avatar_url: string;
    project_limit: number;
    members: Array<User>;
    owners: Array<User>;
}