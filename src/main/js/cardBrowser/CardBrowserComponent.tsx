import { CardService, } from '@src/cardBrowser/CardService';

import { CardGalleryGrid } from '@src/cardGallery/CardGalleryGrid';
import { CardGalleryTable } from '@src/cardGallery/CardGalleryTable';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { IBasicCardFilter, BasicFilterService } from '@src/cardBrowser/BasicFilter.service';
import { BasicFilterComp } from '@src/cardBrowser/BasicFilter.comp';

export enum CardRenderer
{
  CARD_MEDIUM, CARD_MEDIUM_MOBILE, CARD_SMALL, CARD_WIDE, TABLE, PREVIEW
}

export interface CardBrowserComponentState
{
  basicFilter: IBasicCardFilter;
  renderer: CardRenderer;
}

export class CardBrowserComponent extends React.Component<{}, CardBrowserComponentState> {

  private service: CardService = new CardService();
  private basicFilterService = new BasicFilterService(this.service);

  public constructor(props: {}, context?: any)
  {
    super(props, context);
    this.state = { basicFilter: {}, renderer: CardRenderer.CARD_MEDIUM };
  }

  private onFilterChange(basicFilter: IBasicCardFilter): void
  {
    this.setState({ basicFilter });
  }

  public render()
  {
    const cards = this.basicFilterService.filter(this.state.basicFilter);

    const layout = this.state.renderer === CardRenderer.TABLE
      ? <CardGalleryTable cards={cards} />
      : <CardGalleryGrid cards={cards} renderer={this.state.renderer} />;

    return (
      <>
      <BasicFilterComp
        service={this.service}
        basicCardFilter={this.state.basicFilter}
        onFilterChange={filter => this.onFilterChange(filter)}
        basicFilterService={this.basicFilterService}
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
