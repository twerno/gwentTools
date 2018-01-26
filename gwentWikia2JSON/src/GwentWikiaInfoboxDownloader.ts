import * as fs from 'fs';

import { GwentWikiaHelper } from './GwentWikiaHelper';
import { ILink } from './GwentWikiaLinkCollector';
import { HttpDownloadService } from './HttpDownloadService';
import { GwentWikiaInfoboxEnchanter } from './GwentWikiaInfoboxEnchanter';

export class GwentWikiaInfoboxDownloader
{
  private infoBoxParser = /{{Infobox\s+Card((.|\s)+?)}}/;

  public constructor(
    private downloader: HttpDownloadService,
    private enchanter?: GwentWikiaInfoboxEnchanter) { }

  public async downloadAndSave(links: ILink[], dir: string, override: boolean = false): Promise<void>
  {
    return new Promise<void>((resolve, reject) =>
    {
      links = override
        ? links
        : links.filter((link) => !fs.existsSync(`${dir}/${this.filename(link)}`));

      if (links.length === 0)
      {
        resolve();
      }
      else
      {
        this.downloader.loadMany(links,
          (link, body, remaining) =>
          {
            let infobox = this.parseInfoBox(body);
            if (infobox)
            {
              if (this.enchanter)
              {
                infobox += this.enchanter.enchant(link, this.filename(link), infobox, body);
              }
              GwentWikiaHelper.saveOnDisk(`${dir}/${this.filename(link)}`, infobox);
            }

            if (remaining === 1)
            {
              resolve();
            }
          }, 10);
      }
    });
  }

  private parseInfoBox(body: string): string | null
  {
    const regExpGroup = body.match(this.infoBoxParser);
    if (regExpGroup && regExpGroup.length > 0 && regExpGroup[1])
    {
      return regExpGroup[1];
    }

    return null;
  }

  private filename(link: ILink): string
  {
    return link.id
      .replace(/\/wiki\//g, '')
      .replace(/:/g, '_');
  }
}
