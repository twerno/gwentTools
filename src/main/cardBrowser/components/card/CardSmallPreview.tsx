import './CardSmallPreview.css';

import * as React from 'react';
import { ICardv1 } from '@src/commons/card/CardStruct';

export interface CardSmallPreviewProps
{
  card: ICardv1;
}

export interface CardSmallPreviewState
{
  highlight: boolean;
}

export class CardSmallPreview extends React.Component<CardSmallPreviewProps, CardSmallPreviewState>
{

  public constructor(props: CardSmallPreviewProps)
  {
    super(props);
    this.state = { highlight: false };
  }

  public render()
  {
    const card = this.props.card;

    return <div className="cardPreview">
      {/* <CardSmall card={{ ...card, name: '' }} /> */}
      <img src="../remoteAssets/card_test.png" style={{ width: '100px' }} />
      <div
        className="cardTextBox"
        onMouseEnter={() => this.setState({ highlight: true })}
        onMouseLeave={() => this.setState({ highlight: false })}
      >
        <div className="cardNamePreview">{card.name}</div>
        <div className="cardTagsPreview">{this.tags(card)}</div>
        <div className="cardTextPreview">{this.cardText2Str(card.cardText)}</div>
      </div>

    </div>;
  }

  private tags(card: ICardv1)
  {
    return card.tags && card.tags.length > 0
      ? card.tags.reduce((a, b) => `${a}, ${b}`)
      : '';
  }

  private cardText2Str(cardText: string[]): JSX.Element
  {
    return cardText.length === 1
      ? <>{cardText[0]}</>
      : <>{cardText.map(s => <>{s}</>).reduce((a, b) => <> {a} <br /> {b}</>)}</>;
  }
}
