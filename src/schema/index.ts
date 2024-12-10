export interface BaseDocument {
    _id: {$oid: string};
    created_at: {$date: string};
    updated_at: {$date: string};
}