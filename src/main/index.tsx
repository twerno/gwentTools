import './app.less';

import * as React from 'react';
import { Panel } from 'react-bootstrap';
import * as ReactDOM from 'react-dom';
import { CardBrowserComponent } from '@src/cardBrowser/CardBrowser.comp';

ReactDOM.render(
  <div>
    {true ?
      <Panel header="Gwent Duel Calculator" bsStyle="info">
        <div className="editPanel">
          <CardBrowserComponent />
        </div>
      </Panel>
      : <></>
    }
    {/* <ImageMapJsonGenerator /> */}
    {/* <GoogleImage /> */}
    {/* <DuelCalcComponent />
    <StickyFooter /> */}
  </div>
  ,
  document.getElementById('duelCalc')
);
