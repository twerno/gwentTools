import { ILink } from './GwentWikiaLinkCollector';

export class GwentWikiaInfoboxEnchanter
{
  public enchant(link: ILink, filename: string, infobox: string, infoboxRaw: string): string
  {
    let result = `\n|__url=${link.urlToShow}`;
    result += `\n|__wiki_id=${link.id.replace(/\/wiki\//g, '')}`;
    result += `\n|__filename=${filename}`;
    result += `\n|__set=${this.setFromUrl(infobox)}`;
    if (infoboxRaw.search(/{{Removed}}/) !== -1)
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
}
