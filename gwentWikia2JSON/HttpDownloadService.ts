import * as http from 'http';

import { GwentWikiaHelper } from './GwentWikiaHelper';
import { ILink } from './GwentWikiaLinkCollector';

interface ILoadQueueData
{
  remainingLinks: ILink[];
  callback: (link: ILink, responseBody: string, remaining: number) => void;
  remainingTasks: number;
}

export class HttpDownloadService
{

  public loadMany(
    links: ILink[],
    callback: (link: ILink, responseBody: string, remaining: number) => void,
    concurency: number = 5)
  {
    const queueData: ILoadQueueData = {
      remainingLinks: [...links],
      callback,
      remainingTasks: links.length
    };

    for (let i = 0; i < concurency; i++)
    {
      this.startTask(queueData);
    }

  }

  private startTask(data: ILoadQueueData): void
  {
    const link: ILink | undefined = data.remainingLinks.shift();
    if (link)
    {
      this.loadOne(link.url)
        .then((value: string) =>
        {
          data.callback(link, value, data.remainingTasks--);
          this.startTask(data);
        })
        .catch(reason =>
        {
          GwentWikiaHelper.logError(reason);
          data.remainingTasks--;
          this.startTask(data);
        });
    }

  }

  public loadOne(url: string): Promise<string>
  {
    return new Promise((resolve, reject) =>
    {
      GwentWikiaHelper.log(`Downloading: ${url}`);
      http.get(url, (response: http.IncomingMessage) =>
      {
        this.handleResponse(response)
          .then((rawPage: string) => resolve(rawPage))
          .catch(reason => reject(reason));
      });
    });
  }

  private handleResponse(response: http.IncomingMessage): Promise<string>
  {
    return new Promise((resolve, reject) =>
    {
      try
      {
        response.setEncoding('utf8');
        let rawData = '';
        response.on('data', (chunk) => { rawData += chunk; });
        response.on('end', () => resolve(rawData));
      }
      catch (e)
      {
        reject(e);
      }
    });
  }
}
