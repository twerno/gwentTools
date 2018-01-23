import './DuelResult.style.less';

import * as React from 'react';
import { Icons8Img } from '@src/commons/assets/Icons8Img';

export interface DuelistProps
{
  strength: number;
  armor: number;
}

export class Duelist extends React.PureComponent<DuelistProps, {}> {

  public render()
  {
    if (this.props.strength === 0)
    {
      return <img src={Icons8Img.SKULL} className="bigIcon" />;
    }

    return (
      <div>
        <div>
          <span>
            <img src={Icons8Img.SWORD} className="duelistLittleIcon" />
          </span>
          <span>
            {this.props.strength}
          </span>
        </div>
        <div>
          <span>
            <img src={Icons8Img.SHIELD} className="duelistLittleIcon" />
          </span>
          <span>
            {this.props.armor}
          </span>
        </div>
      </div>
    );
  }
}