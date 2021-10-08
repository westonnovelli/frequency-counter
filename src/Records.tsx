import type { GroupedRecordable, Recordable } from './Recordable';
import React from 'react';
import './Records.css';
import { format } from 'date-fns/esm';
import { editTime } from './release-flags';

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

const Timestamp: React.FC<TProps> = ({ record, mode, update }) => {
  const date = new Date(record.timestamp)
  const time = editTime && mode
    ? `${format(date, 'yyyy-MM-dd')}T${format(date, 'HH:mm')}`
    : format(date, 'p');

  return editTime && mode ? (
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

const Note: React.FC<TProps> = ({ record, mode, update }) => {
  return mode ? (
    <input
      value={record.note ?? ''}
      onChange={(e) => update({
        ...record,
        note: e.target.value,
      })}
    />
  ) : (
    <div className="record-note">{record.note}</div>
  );
};

const RecordDetails: React.FC<TProps> = ({ record, mode, update }) => {
  return (
    <div className="record-item-details">
      <Timestamp record={record} mode={mode} update={update} />
      <div className="record-count">{(record.subRecords ?? []).length + 1}</div>
      <Note record={record} mode={mode} update={update} />
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
