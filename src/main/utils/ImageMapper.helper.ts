import { IImageMapEl, imageMap } from '../../../gwentWikia2JSON/db/ImageMap';

export function getElFromImgId(id: string): IImageMapEl | null
{
  for (const el of imageMap)
  {
    if (el.img instanceof Array)
    {
      for (const imgId of el.img)
      {
        if (parseInt(imgId, 0) === parseInt(id, 0))
        {
          return el;
        }
      }
    }
    else
    {
      if (parseInt(el.img, 0) === parseInt(id, 0))
      {
        return el;
      }
    }
  }
  return null;
}
