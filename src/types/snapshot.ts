import type {Follower} from "@/types/follower.ts";

export interface Snapshot {
    id?: number;
    timestamp: Date;
    followerCount: number;
    followers: Follower[];
}