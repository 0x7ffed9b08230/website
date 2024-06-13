export interface IDeveloper {
    name: string;
    login: string;
    avatar_url: string;
    bio: string;
    location: string;
    blog: string;
    twitter_username: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
    repos: IRepo[];
    README: string;
}

export interface IRepo {
    name: string;
    description: string;
    language: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    created_at: string;
    updated_at: string;
    license: {
        name: string;
        spdx_id: string;
        content: string;
    },
    html_url: string;
    image: string;
    readme: string;
}