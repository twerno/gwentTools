import './CardSmallPreview.css';

import { CardSmall } from '@src/cardGallery/CardSmall';
import { ICardv1 } from '@src/commons/CardStruct';
import * as React from 'react';

export interface CardSmallPreviewProps
{
  card: ICardv1;
}

export class CardSmallPreview extends React.Component<CardSmallPreviewProps, {}>
{

  public render()
  {
    const card = this.props.card;

    return <div className="cardPreview">
      <CardSmall card={{ ...card, name: '' }} />
      <div className="cardTextBox">
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
