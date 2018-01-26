import * as React from 'react';
import { CardService } from '@src/cardBrowser/Card.service';
import { getSmallImgUrl, getMediumImgUrl } from '@src/commons/assets/GwentAssets.helper';
import { ICardv1 } from '@src/commons/card/CardStruct';
import { getElFromImgId } from '@src/utils/ImageMapper.helper';

export class ImageMapper extends React.Component<{}, {}>
{
  private cardService: CardService = new CardService();

  public render()
  {
    let elements: string[] = [];
    for (let i = 1; i < 531; i++)
    {
      elements.push(this.fillLeftStr(i.toString(), 5, '0'));
    }

    elements = this.odfiltrujZmapowane(elements); // .slice(0, 10);

    return (
      <div>
        {elements.map(e => <div key={e}>
          <img src={this.imgUrl(e)} />
          {this.renderRow(e)}
        </div>)}
      </div>
    );
  }

  private renderRow(imgId: string): JSX.Element
  {
    const card = this.findCard(imgId);
    return card === undefined
      ? <a href={this.googleSeachUrl(imgId)} target="_blank">{imgId}</a>
      : <a href={card.url} target="_blank">{card.name}</a>;
  }

  private fillLeftStr(base: string, width: number, filler: string): string
  {
    filler = filler || '0';
    base = base + '';
    return base.length >= width
      ? base
      : new Array(width - base.length + 1).join(filler) + base;
  }

  private imgUrl(id: string, remote: boolean = false): string
  {
    return getSmallImgUrl(id, remote);
  }

  private imgUrlBig(id: string): string
  {
    return getMediumImgUrl(id);
  }

  private googleSeachUrl(id: string): string
  {
    // tslint:disable-next-line:max-line-length
    return `https://www.google.com/searchbyimage?site=search&sa=X&image_url=${this.imgUrl(id, true)}&hl=en-PL&q=site%3Agwent.wikia.com&oq=site%3Agwent.wikia.com`;
  }

  private odfiltrujZmapowane(imgIdList: string[]): string[]
  {
    return imgIdList.filter(imgId => this.findCard(imgId) === undefined);
  }

  private findCard(imgId: string): ICardv1 | undefined
  {
    const mapEl = getElFromImgId(imgId);
    if (mapEl && mapEl.wikiUrl && mapEl.wikiUrl !== '')
    {
      const wikiUrl = (mapEl.wikiUrl || '').toLowerCase();
      const card = this.cardService.getAllCards()
        .find(c => c.url.toLowerCase() === wikiUrl);
      return card;
    }
    return undefined;
  }

}
