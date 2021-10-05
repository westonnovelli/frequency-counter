import type { Recordable } from './Recordable';
import React from 'react';

const useRecorder = (seed = [] as Recordable[], save?: (data: any) => void ): [Recordable[], () => void] => {
    const [records, setRecords] = React.useState<Recordable[]>(seed);

    const addRecord = () => {
        setRecords(prev => {
            const next = prev.concat([{timestamp: Date.now(), count: 1}]);
            save?.(next);
            return next;
        });
    };
    
    return [records, addRecord]
}

export default useRecorder;
