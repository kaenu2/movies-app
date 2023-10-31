import { ICreateSessionGuest, IGenreList, IGetMoveList, IGetRatedMoveList } from './type';

export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3';

  _apiKey = 'b650b4714c3496a9919247c710adc070';

  sessionId: string | null = null;

  async getResource(url: string): Promise<IGetMoveList | ICreateSessionGuest | IGetRatedMoveList | any> {
    try {
      const response: Response = await fetch(this._apiBase + url);

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}\n received ${response.status}`);
      }

      return await response.json();
    } catch (e) {
      throw new Error('');
    }
  }

  async PostResource(url: string, body: any) {
    try {
      const response: Response = await fetch(this._apiBase + url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`Could not fetch ${url}\n received ${response.status}`);
      }
      return await response.json();
    } catch (e) {
      throw new Error('');
    }
  }

  getCookie(name: string) {
    const matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([$?*|{}\\/^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : null;
  }

  getMoveList(search: string, page: number): Promise<IGetMoveList> {
    return this.getResource(`/search/movie?query=${search}&api_key=${this._apiKey}&page=${page}&language=eu`);
  }

  async createGuestSession(): Promise<void> {
    if (this.getCookie('api_key') === null) {
      await this.getResource(`/authentication/guest_session/new?api_key=${this._apiKey}`).then((res) => {
        document.cookie = `api_key=${res.guest_session_id}; max-age=50`;
        this.sessionId = res.guest_session_id;
      });
    }
    this.sessionId = this.getCookie('api_key');
  }

  getRatedList(page: number): Promise<IGetRatedMoveList> {
    return this.getResource(`/guest_session/${this.sessionId}/rated/movies?api_key=${this._apiKey}&page=${page}`);
  }

  getGenreList(): Promise<IGenreList> {
    return this.getResource(`/genre/movie/list?api_key=${this._apiKey}`);
  }

  addRating(movieId: number, current: number) {
    return this.PostResource(`/movie/${movieId}/rating?api_key=${this._apiKey}&guest_session_id=${this.sessionId}`, {
      value: current,
    });
  }
}
