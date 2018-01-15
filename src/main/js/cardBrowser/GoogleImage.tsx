import { CardService } from '@src/cardBrowser/CardService';
import { GwentAssetsHelper } from '@src/commons/GwentAssetsHelper';
import { getElFromImgId } from '@src/commons/ImageMap';
import * as React from 'react';

export class GoogleImage extends React.Component<{}, {}>
{
  private cardService: CardService = new CardService();

  public render()
  {
    const elements: string[] = [];
    for (let i = 1; i < 531; i++)
    {
      elements.push(this.fillLeftStr(i.toString(), 5, '0'));
    }

    const filtered = this.odfiltrujZmapowane(elements);

    return (
      <div>
        {filtered.map(e => <div key={e}>
          <img src={this.imgUrl(e)} />
          <a href={this.googleSeachUrl(e)} target="_blank">{e}</a>
        </div>)}
      </div>
    );
  }

  private fillLeftStr(base: string, width: number, filler: string): string
  {
    filler = filler || '0';
    base = base + '';
    return base.length >= width
      ? base
      : new Array(width - base.length + 1).join(filler) + base;
  }

  private imgUrl(id: string): string
  {
    return GwentAssetsHelper.getSmallImgUrl(id);
  }

  private imgUrlBig(id: string): string
  {
    return GwentAssetsHelper.getMediumImgUrl(id);
  }

  private googleSeachUrl(id: string): string
  {
    // tslint:disable-next-line:max-line-length
    return `https://www.google.com/searchbyimage?site=search&sa=X&image_url=${this.imgUrl(id)}&hl=en-PL&q=site%3Agwent.wikia.com&oq=site%3Agwent.wikia.com`;
  }

  private odfiltrujZmapowane(imgIdList: string[]): string[]
  {
    return imgIdList.filter(imgId =>
    {
      const mapEl = getElFromImgId(imgId);
      if (mapEl && mapEl.wikiUrl && mapEl.wikiUrl !== '')
      {
        const wikiUrl = (mapEl.wikiUrl || '').toLowerCase();
        const card = this.cardService.getAllCards()
          .find(c => c.url.toLowerCase() === wikiUrl);
        return card === null;
      }
      return true;
    });
  }

}
