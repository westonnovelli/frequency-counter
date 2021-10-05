import type { Recordable } from './Recordable';

import React from 'react';
import './App.css';
import useRecorder from './useRecorder';
import usePersistence from './usePersistence';
import Records from './Records';
import RecordBuilder from './Recordable';

function App() {
  const { save, load } = usePersistence<Recordable[]>();
  const [ records, record ] = useRecorder(load([] as Recordable[]), save);

  const summary = new RecordBuilder(records).debouce().groupByDate();

  const [showRaw, _setShowRaw] = React.useState(false);

  return (
    <div className="App">
      <h1>
        Frequency Counter
      </h1>
      <div id="receiver" onClick={record} />
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Records records={summary} />
        {showRaw && <div style={{display: 'flex', flexDirection: 'column'}}>
          raw
          {records.map((r) => (
            <span key={r.timestamp}>{r.timestamp} - {r.count}</span>
          ))}
        </div>}
      </div>
    </div>
  );
}

export default App;
