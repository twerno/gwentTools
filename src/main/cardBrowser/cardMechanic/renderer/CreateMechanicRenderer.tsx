import * as React from 'react';

import { CardService } from '@src/cardBrowser/Card.service';
import { BasicFilterService } from '@src/cardBrowser/components/filter/BasicFilter.service';
import { CardSmall } from '@src/cardBrowser/components/card/CardSmall';
import { nextId } from '@src/commons/Numerator';
import { CreateAbility } from '@src/commons/card/Ability';
import { CreateMechanicHelper } from '@src/cardBrowser/cardMechanic/renderer/CreateMechanic.helper';

export interface CreateMechanicRendererProps
{
  mechanic: CreateAbility;
  basicCardService: BasicFilterService;
}

export class CreateMechanicRenderer extends React.PureComponent<CreateMechanicRendererProps, {}> {

  public render()
  {
    const cards = this.props.basicCardService.filter(this.props.mechanic.filter);
    const filterStr = this.props.basicCardService.basicFilter2Filter(this.props.mechanic.filter);
    const textHelper: CreateMechanicHelper = new CreateMechanicHelper();

    return (
      <>
      <div>{textHelper.ability2Text(this.props.mechanic)}</div>
      <ul>
        {cards.map(c => <li key={c.url}><CardSmall card={c} /></li>)}
      </ul>
      </>
    );
  }
}
