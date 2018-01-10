import { CardService, IFilter } from '@src/cardBrowser/CardService';
import { ICardv1, isIUnitv1 } from '@src/commons/CardStruct';
import * as React from 'react';

export interface CardGalleryTableProps
{
  filter: IFilter;
  service: CardService;
}

export class CardGalleryTable extends React.Component<CardGalleryTableProps, {}>
{

  public render()
  {
    return (
      <>
      <table className="table table-striped resultTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Tags</th>
            <th>Rarity</th>
            <th>Color</th>
            <th>Faction</th>
            <th>Set</th>
            <th>Loyalty</th>
            <th>Strength</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {this.renderCards()}
        </tbody>
      </table>
      </>
    );
  }

  private renderCards(): JSX.Element
  {
    const cards = this.props.service.getFiltered(this.props.filter);
    return <>
      {cards.map(card => this.renderCard(card))}
      </>;
  }

  private renderCard(card: ICardv1): JSX.Element
  {
    return (
      <tr key={card.name}>
        <td>{card.name}</td>
        <td>{card.cardType}</td>
        <td>{this.tags2Str(card.tags)}</td>
        <td>{card.rarity}</td>
        <td>{card.cardColor}</td>
        <td>{card.faction}</td>
        <td>{card.set}</td>
        <td>{isIUnitv1(card) ? card.loyalty : ''}</td>
        <td>{isIUnitv1(card) ? `${card.strength}` : ''}</td>
        <td>{this.cardText2Str(card.cardText)}</td>
      </tr>
    );
  }

  private tags2Str(tags: string[]): string
  {
    return tags && tags.length > 0
      ? tags.reduce((a, b) => `${a}, ${b}`)
      : '';
  }

  private cardText2Str(cardText: string[]): JSX.Element
  {
    return cardText.length === 1
      ? <>{cardText[0]}</>
      : <>{cardText.map(s => <>{s}</>).reduce((a, b) => <> {a} <br /> {b}</>)}</>;
  }
}
