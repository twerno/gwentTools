import { ArmorMechanic } from '@src/cardBrowser/card/mechanic/Mechanic';
import * as React from 'react';

export interface ArmorMechanicRendererProps
{
  mechanic: ArmorMechanic;
}

export class ArmorMechanicRendererBasic extends React.PureComponent<ArmorMechanicRendererProps, {}> {

  public render()
  {
    return <>{this.props.mechanic.value} <b>Amor</b></>;
  }

}
