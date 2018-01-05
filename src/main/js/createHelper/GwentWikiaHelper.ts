export abstract class GwentWikiaHelper
{
  public static removeDuplicates(links: string[]): string[]
  {
    const keys: { [key: string]: string } = {};

    return links.filter((link, index) =>
    {
      if (keys[link] === undefined)
      {
        keys[link] = link;
        return true;
      }
      return false;
    });
  }
}
