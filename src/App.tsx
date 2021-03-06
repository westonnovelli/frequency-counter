import type { Recordable } from './Recordable';

import React from 'react';
import { useGesture } from '@use-gesture/react';
import './App.css';
import useRecorder from './useRecorder';
import usePersistence from './usePersistence';
import Records from './Records';
import RecordBuilder from './Recordable';

const DEV_MODE = process.env.NODE_ENV === 'development';

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
  useGesture({
    onPinch: () => {
      setMode(true);
    },
    onWheel: (e) => {
      if (DEV_MODE && e.ctrlKey) {
        setMode(true);
      }
    }},
    {
      target: ref,
    }
  );

  const handleClick = () => {
    !mode && addRecord();
  }

  return (
    <div className="App" onClick={handleClick} ref={ref}>
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
          <button className="done" disabled={queue.length === 0} onClick={() => {
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
