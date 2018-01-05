import * as fs from 'fs';

import { GwentWikiaHelper } from './GwentWikiaHelper';
import { ILink } from './GwentWikiaLinkCollector';
import { HttpDownloadService } from './HttpDownloadService';

export class GwentWikiaInfoboxDownloader
{
  private infoBoxParser = /{{Infobox\s+Card((.|\s)+?)}}/;

  public constructor(private downloader: HttpDownloadService) { }

  public async downloadAndSave(links: ILink[], dir: string, override: boolean = false): Promise<void>
  {
    return new Promise<void>((resolve, reject) =>
    {
      links = override
        ? links
        : links.filter((link) => !fs.existsSync(`${dir}/${link.id}`));

      if (links.length === 0)
      {
        resolve();
      }
      else
      {
        this.downloader.loadMany(links,
          (link, body, remaining) =>
          {
            const infobox = this.parseInfoBox(body);
            if (infobox)
            {
              GwentWikiaHelper.saveOnDisk(`${dir}/${link.id}`, infobox);
            }

            if (remaining === 0)
            {
              resolve();
            }
          });
      }
    });
  }

  private parseInfoBox(body: string): string | null
  {
    const regExpGroup = body.match(this.infoBoxParser);
    if (regExpGroup && regExpGroup.length > 0)
    {
      return regExpGroup[1];
    }

    return null;
  }
}
