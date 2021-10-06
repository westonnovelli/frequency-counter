import type { GroupedRecordable, Recordable } from './Recordable';
import React from 'react';
import './Records.css';

interface Props {
  records: GroupedRecordable;
  mode: boolean;
  updateRecord: (id: string, value: Recordable) => void;
}

interface TProps {
  record: Recordable;
  mode: boolean;
  update: (value: Recordable) => void;
}

// 2021-10-05T15:22:001.22Z => 2021-10-05T15:22
function toInput(date: Date) {
  const iso = date.toISOString();
  const split = iso.split(':');
  split.pop();
  return split.join(':');
}

const Timestamp: React.FC<TProps> = ({ record, mode, update }) => {
  const date = new Date(record.timestamp)
  const time = mode ? toInput(date) : date.toLocaleTimeString();
  return mode ? (
    <input
      type="datetime-local"
      value={time}
      onChange={(e) => update({
        ...record,
        timestamp: new Date(e.target.value).getTime(),
      })}
    />
  ) : (
    <div className="record-time">{time}</div>
  );
};

const RecordDetails: React.FC<TProps> = ({ record, mode, update }) => {
  return (
    <div className="record-item-details">
      <Timestamp record={record} mode={mode} update={update} /> -{' '}
      <div className="record-count">{record.count}</div>
    </div>
  );
};

const Records: React.FC<Props> = ({ records, mode, updateRecord }) => {
  return (
    <div className="records">
      {Object.keys(records)
        .sort()
        .map((group) => (
          <div className="group" key={group}>
            <div className="group-title">{group}</div>
            {records[group].map((record) => (
              <div key={record.id} className="record-item">
                <RecordDetails record={record} mode={mode} update={(u) => updateRecord(record.id, u)} />
                {mode && record.subRecords && (
                  <div className="record-sub-items">
                    {record.subRecords.map((subRecord) => (
                      <RecordDetails
                        record={subRecord}
                        mode={mode}
                        update={(u) => updateRecord(subRecord.id, u)}
                        key={subRecord.id}
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
