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

// 2021-10-05T15:22:001.22Z => 2021-10-05T15:22
function toInput(date: Date) {
  const iso = date.toISOString();
  const split = iso.split(':');
  split.pop();
  return split.join(':');
}

const Timestamp: React.FC<TProps> = ({ record, mode }) => {
  const time = new Date(record.timestamp).toLocaleTimeString();
  const [controlledTime, setControlledTime] = React.useState(
    new Date(record.timestamp)
  );
  return mode ? (
    <input
      type="datetime-local"
      value={toInput(controlledTime)}
      onChange={(e) => setControlledTime(new Date(e.target.value))}
    />
  ) : (
    <div className="record-time">{time}</div>
  );
};

const RecordDetails: React.FC<TProps> = ({ record, mode }) => {
  return (
    <div className="record-item-details">
      <Timestamp record={record} mode={mode} /> -{' '}
      <div className="record-count">{record.count}</div>
    </div>
  );
};

const Records: React.FC<Props> = ({ records, mode }) => {
  return (
    <div className="records">
      {Object.keys(records)
        .sort()
        .map((group) => (
          <div className="group" key={group}>
            <div className="group-title">{group}</div>
            {records[group].map((record) => (
              <div key={record.timestamp} className="record-item">
                <RecordDetails record={record} mode={mode} />
                {mode && record.subRecords && (
                  <div className="record-sub-items">
                    {record.subRecords.map((subRecord) => (
                      <RecordDetails
                        record={subRecord}
                        mode={mode}
                        key={subRecord.timestamp}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Records;
