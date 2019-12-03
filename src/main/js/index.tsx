import './app.less';

import { DuelCalcComponent } from '@src/duelCalc/DuelCalcComponent';
import { StickyFooter } from '@src/Footer';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

ReactDOM.render(
  <div id="page-container">
    <div id="content-wrap">
      <DuelCalcComponent />
    </div>
    <StickyFooter />
  </div>
  ,
  document.getElementById('duelCalc')
);
