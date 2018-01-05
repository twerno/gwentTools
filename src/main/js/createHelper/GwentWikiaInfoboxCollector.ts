import * as fs from 'fs';

import { Downloader } from './Downloader';
import { GwentWikiaInfoboxStats } from './GwentWikiaInfoboxStats';
import { ILink } from './GwentWikiaLinkCollector';

export class GwentWikiaInfoboxCollector
{
  private infoBoxParser = /{{Infobox\s+Card((.|\s)+?)}}/;
  private stats: GwentWikiaInfoboxStats = new GwentWikiaInfoboxStats();

  public constructor(private downloader: Downloader) { }

  public async downloadNew(links: ILink[]): Promise<void>
  {
    for (const link of links)
    {
      if (!fs.existsSync(`cache/${link.id}`))
      {
        const rawInfoBox: string = await this.getInfoBox(link.url);
        fs.writeFile(`cache/${link.id}`, rawInfoBox, 'utf8', (e) => console.error(e));
      }
    }
  }

  public async collect(links: string[]): Promise<void>
  {
    for (const link of links)
    {
      const rawInfoBox: string = await this.getInfoBox(link);
      this.stats.add2Stats(rawInfoBox);
    }
    this.stats.save('collect.txt');
  }

  private async getInfoBox(link: string): Promise<string>
  {
    console.log(`Downloading: ${link}`);
    const body: string = await this.downloader.load(link);
    const regExpGroup = body.match(this.infoBoxParser);
    if (regExpGroup && regExpGroup.length > 0)
    {
      return regExpGroup[1];
    }
    return '';
  }
}
