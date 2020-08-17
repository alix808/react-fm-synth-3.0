import React from 'react';
import Note from './Note';

const Grid = () => {
  return (
    <section>
      <Note frequency={44} />
      <Note frequency={8} />
      <Note frequency={58} />
      <Note frequency={65} />
      <Note frequency={5} />
      <Note frequency={10} />
      <Note frequency={52} />
      <Note frequency={5} />
      <Note frequency={54} />
    </section>
  );
};

export default Grid;
