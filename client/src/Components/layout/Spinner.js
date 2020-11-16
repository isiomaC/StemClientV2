import React, { Fragment } from 'react';
import load from './25.gif';


export default () => (
  <Fragment>
    <img
      src={load}
      style={{ width: '50px', margin: 'auto', display: 'block' }}
      alt='Loading...'
    />
  </Fragment>
);
