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
              infobox += this.add2Infobox(link, infobox, body);
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

  private add2Infobox(link: ILink, infobox: string, body: string): string
  {
    let result = `\n|__url=${link.urlToShow}`;
    result += `\n|__wiki_id=${link.id.replace(/\/wiki\//g, '')}`;
    result += `\n|__filename=${this.filename(link)}`;
    result += `\n|__set=${this.setFromUrl(infobox)}`;
    if (body.search(/{{Removed}}/) !== -1)
    {
      result += `\n|__removed=true`;
    }

    return result;
  }

  private setFromUrl(infoBox: string): string
  {
    const group = infoBox.match(/\|\s*url\s*=.+?_\((.+)\)/);
    if (group && group.length > 1 && group[1])
    {
      return group[1];
    }
    return '';
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
