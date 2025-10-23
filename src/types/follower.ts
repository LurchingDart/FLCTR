export interface Follower {
    id: string;
    username: string;
    fullName: string;
    profileUrl: string;
    avatarUrl: string;
    isVerified: boolean;
    followedByYou: boolean;
}