import '../resources/static/app.less';

import { DuelCalcComponent } from '@src/duelCalc/DuelCalcComponent';
import { StickyFooter } from '@src/Footer';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

ReactDOM.render(
  <div>
    <DuelCalcComponent />
    <StickyFooter />
  </div>
  ,
  document.getElementById('duelCalc')
);
