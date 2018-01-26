import * as React from 'react';
import { CardService } from '@src/cardBrowser/Card.service';
import { getSmallImgUrl } from '@src/commons/assets/GwentAssets.helper';
import { imageMap, IImageMapEl } from '../../../gwentWikia2JSON/db/ImageMap';

export class ImageMapJsonGenerator extends React.Component<{}, {}>
{
  private service: CardService;

  public constructor(props: {})
  {
    super(props);
    this.service = new CardService();
  }

  public render()
  {
    const cards = this.service.getAllCards();

    const newImageMap = cards.map(c => ({ wikiUrl: c.url, img: '' })) as IImageMapEl[];

    imageMap
      .filter(e => e.img !== '')
      .forEach(e =>
      {
        const nez = newImageMap.find(ne => ne.wikiUrl === e.wikiUrl);
        if (nez !== undefined)
        {
          nez.img = e.img;
        }
      });

    return (
      <div>
        {JSON.stringify(newImageMap)}
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
    return getSmallImgUrl(id);
  }

  private googleSeachUrl(id: string): string
  {
    // tslint:disable-next-line:max-line-length
    return `https://www.google.com/searchbyimage?site=search&sa=X&image_url=${this.imgUrl(id)}&hl=en-PL&q=site%3Agwent.wikia.com&oq=site%3Agwent.wikia.com`;
  }
}
