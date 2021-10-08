import type { Recordable } from './Recordable';
import React from 'react';
import { nanoid } from 'nanoid';
import RecordBuilder from './Recordable';

interface Result {
    records: Recordable[];
    addRecord: () => void;
    setRecords: (next: Recordable[]) => void;
    queue: Recordable[];
    queueUpdate: (id: string, value: Recordable) => void;
    cancelQueue: () => void;
    submitQueue: () => void;
}

const useRecorder = (seed = [] as Recordable[], save?: (data: any) => void ): Result => {
    const [records, setRecords] = React.useState<Recordable[]>(seed);
    const [queue, setQueue] = React.useState<Recordable[]>([]);

    const addRecord = () => {
        setRecords(prev => {
            const next = prev.concat([{
                id: nanoid(),
                timestamp: Date.now(),
                count: 1
            }]);
            save?.(new RecordBuilder(next).compress().get);
            return next;
        });
    };

    const queueUpdate = (id: string, value: Recordable) => {
        setQueue((prev) => {
            const base = prev.length === 0 ? records : prev;
            const next = base.map((r) => {
                if (r.id === id) {
                    const { subRecords, ...rest } = value;
                    return {
                        ...r,
                        ...rest,
                    };
                }
                return r;
            });
            return next;
        });
    };

    const cancelQueue = () => {
        setQueue(records);
        setQueue([]);
    };

    const submitQueue = () => {
        setRecords(queue);
        setQueue([]);
    };
    
    return { records, addRecord, setRecords, queue, queueUpdate, cancelQueue, submitQueue };
}

export default useRecorder;
