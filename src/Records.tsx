import type { GroupedRecordable, Recordable } from './Recordable';
import React from 'react';
import './Records.css';

interface Props {
    records: GroupedRecordable;
    mode: boolean;
}

interface TProps {
  record: Recordable;
  mode: boolean;
}

const Timestamp: React.FC<TProps> = ({ record, mode }) => {
  const time = new Date(record.timestamp).toLocaleTimeString();
  const [controlledTime, setControlledTime] = React.useState(record.timestamp);
  return mode ? (
    <input type="datetime-local" value={controlledTime} />
  ) : (
    <div>{time}</div>
  );
};

const Records: React.FC<Props> = ({ records, mode }) => {
    return (
        <div className="records">
          {Object.keys(records).sort().map((group) => (
            <div className="group" key={group}>
              <div className="group-title">{group}</div>
              {records[group].map((record) =>  (
                <div key={record.timestamp}><Timestamp record={record} mode={mode}/> - {record.count}</div>
              ))}
            </div>
          ))}
        </div>
    );
};

export default Records;
