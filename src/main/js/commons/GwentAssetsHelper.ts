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
    return `/remoteAssets/small/${id}.jpg`;
  }

  public static getMediumImgUrl(id: string): string
  {
    id = fillLeftStr(id, 5, '0');

    if (process.env.NODE_ENV === 'production')
    {
      return `https://s3-eu-west-1.amazonaws.com/gwenttools/cards/${id}.jpg`;
    }
    return `/remoteAssets/${id}.jpg`;
  }
}
