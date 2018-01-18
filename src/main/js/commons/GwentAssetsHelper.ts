import { fillLeftStr } from '@src/commons/StringHelper';

export class GwentAssetsHelper
{
  public static getSmallImgUrl(id: string): string
  {
    id = fillLeftStr(id, 5, '0');

    if (process.env.NODE_ENV === 'production')
    {
      return `https://s3-eu-west-1.amazonaws.com/gwenttools/cards/small/${id}.jpg`;
    }
    return `./remoteAssets/small/${id}.jpg`;
  }

  public static getMediumImgUrl(id: string): string
  {
    // id = fillLeftStr(id, 5, '0');
    if (id === '')
    {
      id = '100';
    }
    id = fillLeftStr(id, 5, '0');

    if (process.env.NODE_ENV === 'production')
    {
      return `./remoteAssets/medium/${id}.jpg`;
      // return `https://s3-eu-west-1.amazonaws.com/gwenttools/cards/${id}.jpg`;
    }
    return `./remoteAssets/medium/${id}.jpg`;
  }

  private static getRandomInt(max: number): number
  {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
