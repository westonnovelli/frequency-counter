import type { Recordable } from './Recordable';

import React from 'react';
import { useDrag } from '@use-gesture/react';
import './App.css';
import useRecorder from './useRecorder';
import usePersistence from './usePersistence';
import Records from './Records';
import RecordBuilder from './Recordable';

function App() {
  const { save, load } = usePersistence<Recordable[]>();
  const [ records, record ] = useRecorder(load([] as Recordable[]), save);

  const summary = new RecordBuilder(records).debouce().groupByDate();

  const ref = React.useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = React.useState(false);
  useDrag(() => {
    setMode(true);
  }, {
    target: ref
  });

  return (
    <div className="App">
      {!mode && <div id="receiver" onClick={record} ref={ref} />}
      <h1>
        Frequency
      </h1>
      <div className="container">
        <Records records={summary} mode={mode} />
      </div>
      {mode && <button className="done" onClick={() => setMode(false)}>Save</button>}
      {!mode && <div ref={ref} className="swipe"/>}
    </div>
  );
}

export default App;
