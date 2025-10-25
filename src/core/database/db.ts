import Dexie, {type Table} from "dexie";
import type {Profile} from "@/types/profile.ts";
import type {Snapshot} from "@/types/snapshot.ts";
import type {Analysis} from "@/types/analysis.ts";

export class FlctrDatabase extends Dexie {
    profile!: Table<Profile>;
    snapshots!: Table<Snapshot>;
    analyses!: Table<Analysis>;

    constructor() {
        super('flctr_db');
        this.version(1).stores({
            profile: '&id',
            snapshots: '++id, timestamp',
            analyses: '++id, timestamp',
        });
    }
}

export const db = new FlctrDatabase();