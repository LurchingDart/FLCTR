import type {Follower} from "@/types/follower.ts";

export interface Analysis {
    id?: number;
    timestamp: Date;
    snapshotA_id: number;
    snapshotB_id: number;
    gained: Follower[];
    lost: Follower[];
    gainedCount: number;
    lostCount: number;
}