import { CardService } from '@src/cardBrowser/CardService';
import { imageMap } from '@src/commons/ImageMap';
import * as React from 'react';

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

    const newImageMap = cards.map(c => ({ wikiUrl: c.url, imgId: '' }));

    imageMap
      .filter(e => e.imgId !== '')
      .forEach(e =>
      {
        const nez = newImageMap.find(ne => ne.wikiUrl === e.wikiUrl);
        if (nez !== undefined)
        {
          nez.imgId = e.imgId;
        }
      });

    // const elements: string[] = [];
    // for (let i = 1; i < 531; i++)
    // {
    //   elements.push(this.fillLeftStr(i.toString(), 5, '0'));
    // }

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
    return `https://s3-eu-west-1.amazonaws.com/gwenttools/cards/small/${id}.jpg`;
  }

  private googleSeachUrl(id: string): string
  {
    // tslint:disable-next-line:max-line-length
    return `https://www.google.com/searchbyimage?site=search&sa=X&image_url=${this.imgUrl(id)}&hl=en-PL&q=site%3Agwent.wikia.com&oq=site%3Agwent.wikia.com`;
  }
}
