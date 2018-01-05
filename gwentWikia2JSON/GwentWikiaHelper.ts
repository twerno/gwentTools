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

  public static logError(e: any): void
  {
    // tslint:disable-next-line:no-console
    console.error(e);
  }

  public static log(message: string): void
  {
    // tslint:disable-next-line:no-console
    console.log(message);
  }
}
