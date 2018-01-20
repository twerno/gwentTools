import { CardService, IFilter } from '@src/cardBrowser/CardService';
import { CardFilterComponent } from '@src/cardBrowser/FilterComponent';
import { CardGalleryGrid } from '@src/cardGallery/CardGalleryGrid';
import { CardGalleryTable } from '@src/cardGallery/CardGalleryTable';
import * as React from 'react';
import { Button } from 'react-bootstrap';

export enum CardRenderer
{
  CARD_MEDIUM, CARD_MEDIUM_MOBILE, CARD_SMALL, CARD_WIDE, TABLE, PREVIEW
}

export interface CardBrowserComponentState
{
  filter: IFilter;
  renderer: CardRenderer;
}

export class CardBrowserComponent extends React.Component<{}, CardBrowserComponentState> {

  private service: CardService = new CardService();

  public constructor(props: {}, context?: any)
  {
    super(props, context);
    this.state = { filter: {}, renderer: CardRenderer.CARD_MEDIUM };
  }

  private onFilterChange(filter: IFilter): void
  {
    this.setState({ filter });
  }

  public render()
  {
    const layout = this.state.renderer === CardRenderer.TABLE
      ? <CardGalleryTable service={this.service} filter={this.state.filter} />
      : <CardGalleryGrid service={this.service} filter={this.state.filter} renderer={this.state.renderer} />;

    return (
      <>
      <CardFilterComponent
        service={this.service}
        filter={this.state.filter}
        onFilterChange={filter => this.onFilterChange(filter)}
      />
      <div style={{ paddingBottom: '40px' }}>
        <Button onClick={() => this.setRenderer(CardRenderer.CARD_MEDIUM_MOBILE)}>CARD MOBILE</Button>&nbsp;
      <Button onClick={() => this.setRenderer(CardRenderer.CARD_MEDIUM)}>CARD</Button>&nbsp;
      <Button onClick={() => this.setRenderer(CardRenderer.CARD_WIDE)}>WIDE</Button>&nbsp;
      <Button onClick={() => this.setRenderer(CardRenderer.CARD_SMALL)}>SMALL</Button>&nbsp;
      <Button onClick={() => this.setRenderer(CardRenderer.TABLE)}>TABLE</Button>&nbsp;
      <Button onClick={() => this.setRenderer(CardRenderer.PREVIEW)}>PREVIEW</Button>&nbsp;
      </div>

      {layout}

      </>
    );
  }

  private setRenderer(renderer: CardRenderer): void
  {
    if (this.state.renderer !== renderer)
    {
      this.setState({ renderer });
    }
  }
}
