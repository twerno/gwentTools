import * as http from 'http';

export class Downloader
{

  public load(url: string): Promise<string>
  {
    return new Promise((resolve, reject) =>
    {
      try
      {
        http.get(url, (response: http.IncomingMessage) =>
        {
          this.handleResponse(response)
            .then((rawPage: string) => resolve(rawPage));
        });
      } catch (e)
      {
        console.error(e);
        resolve('');
      }
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
        console.error(e);
      }
    });
  }
}
