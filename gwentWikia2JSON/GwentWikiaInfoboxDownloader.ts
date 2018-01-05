import * as fs from 'fs';

import { GwentWikiaInfoboxStats } from './GwentWikiaInfoboxStats';
import { ILink } from './GwentWikiaLinkCollector';
import { HttpDownloadService } from './HttpDownloadService';

export class GwentWikiaInfoboxDownloader
{
  private infoBoxParser = /{{Infobox\s+Card((.|\s)+?)}}/;
  private stats: GwentWikiaInfoboxStats = new GwentWikiaInfoboxStats();

  public constructor(private downloader: HttpDownloadService) { }

  public async downloadAndSave(links: ILink[], override: boolean = false): Promise<void>
  {
    return new Promise<void>((resolve, reject) =>
    {
      links = override
        ? links
        : links.filter((link) => !fs.existsSync(`cache/${link.id}`));

      this.downloader.loadMany(links,
        (link, body, remaining) =>
        {
          const infobox = this.parseInfoBox(body);
          if (infobox)
          {
            this.saveOnDisk(`cache/${link.id}`, infobox);
          }

          if (remaining === 0)
          {
            resolve();
          }
        });
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

  private saveOnDisk(filename: string, content: string): void
  {
    try
    {
      fs.truncateSync(filename, 0);
      // tslint:disable-next-line:no-empty
    } catch (e) { }
    fs.writeFileSync(filename, content);
  }
}
