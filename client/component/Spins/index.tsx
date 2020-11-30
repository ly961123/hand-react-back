import React, { memo } from 'react';
import './index.scss';

const Spins = memo(({ children, spinning }: any) =>
  <div className='spins'>
    {children}
    {
      spinning && <>
        <div className='load-container'></div>
        <div className='boxLoading'></div>
      </>
    }
  </div>
)

export default Spins;