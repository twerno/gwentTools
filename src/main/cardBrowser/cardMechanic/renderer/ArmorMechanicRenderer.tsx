import * as React from 'react';
import { ArmorMechanic } from '@src/cardBrowser/cardMechanic/renderer/Mechanic';

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
