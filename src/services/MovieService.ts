import { IGetMoveList, IGetResource } from './type';

export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3';

  _apiKey = 'b650b4714c3496a9919247c710adc070';

  async getResource(url: string): Promise<IGetResource> {
    const response: Response = await fetch(this._apiBase + url);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}\n received ${response.status}`);
    }

    return response.json();
  }

  getMoveList(search: string, page: number): Promise<IGetMoveList> {
    return this.getResource(`/search/movie?query=${search}&api_key=${this._apiKey}&page=${page}`);
  }
}
