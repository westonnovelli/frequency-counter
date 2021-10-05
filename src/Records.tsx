import type { GroupedRecordable } from './Recordable';
import React from 'react';
import './Records.css';

interface Props {
    records: GroupedRecordable;
}

const Records: React.FC<Props> = ({ records }) => {
    return (
        <div className="records">
          {Object.keys(records).sort().map((group) => (
            <div className="group" key={group}>
              <span className="group-title">{group}</span>
              {records[group].map((record) =>  (
                <span key={record.timestamp}>{new Date(record.timestamp).toLocaleTimeString()} - {record.count}</span>
              ))}
            </div>
          ))}
        </div>
    );
};

export default Records;
