import type { Recordable } from './Recordable';

import React from 'react';
import { usePinch } from '@use-gesture/react';
import './App.css';
import useRecorder from './useRecorder';
import usePersistence from './usePersistence';
import Records from './Records';
import RecordBuilder from './Recordable';

function App() {
  const [mode, setMode] = React.useState(false);
  const { save, load } = usePersistence<Recordable[]>();
  const {
    records,
    addRecord,
    queue,
    queueUpdate,
    cancelQueue,
    submitQueue,
  } = useRecorder(load([] as Recordable[]), save);

  const base = mode && queue.length > 0 ? queue : records;
  const summary = new RecordBuilder(base).debounce().groupByDate();

  const ref = React.useRef<HTMLDivElement | null>(null);
  usePinch(
    () => {
      setMode(true);
    },
    {
      target: ref,
      preventDefault: true,
    }
  );

  return (
    <div className="App">
      {!mode && <div id="receiver" onClick={addRecord} ref={ref} />}
      <h1>Frequency</h1>
      <div className="container">
        <Records records={summary} mode={mode} updateRecord={queueUpdate} />
      </div>
      {mode && (
        <div className="mode-tools">
          <button className="cancel" onClick={() => {
            cancelQueue();
            setMode(false);
          }}>
            Cancel
          </button>
          <button className="done" onClick={() => {
            submitQueue();
            setMode(false);
          }}>
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
