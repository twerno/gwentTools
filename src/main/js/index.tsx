import './app.less';

import { CardRendersGallery } from '@src/cardGallery/CardRendersGallery';
import * as React from 'react';
import { Panel } from 'react-bootstrap';
import * as ReactDOM from 'react-dom';

ReactDOM.render(
  <div>
    {true ?
      <Panel header="Gwent Duel Calculator" bsStyle="info">
        <div className="editPanel">
          <CardRendersGallery />
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
