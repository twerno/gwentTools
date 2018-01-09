import './app.less';

import { CardBrowserComponent } from '@src/cardBrowser/CardBrowserComponent';
import * as React from 'react';
import { Panel } from 'react-bootstrap';
import * as ReactDOM from 'react-dom';

ReactDOM.render(
  <div>
    <Panel header="Gwent Duel Calculator" bsStyle="info">
      <div className="editPanel">
        <CardBrowserComponent />
      </div>
    </Panel>
    {/* <DuelCalcComponent />
    <StickyFooter /> */}
  </div>
  ,
  document.getElementById('duelCalc')
);
