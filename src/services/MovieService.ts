import { ICreateSessionGuest, IGenreList, IGetMoveList, IGetRatedMoveList } from './type';

export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3';

  _apiKey = 'b650b4714c3496a9919247c710adc070';

  sessionId: null | string = null;

  async getResource(url: string): Promise<IGetMoveList | ICreateSessionGuest | IGetRatedMoveList | any> {
    const response: Response = await fetch(this._apiBase + url);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}\n received ${response.status}`);
    }

    return response.json();
  }

  async PostResource(url: string, body: any) {
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
    return response.json();
  }

  getMoveList(search: string, page: number): Promise<IGetMoveList> {
    return this.getResource(`/search/movie?query=${search}&api_key=${this._apiKey}&page=${page}`);
  }

  async createGuestSession(): Promise<void> {
    if (sessionStorage.getItem('session-id') === null) {
      await this.getResource(`/authentication/guest_session/new?api_key=${this._apiKey}`).then((res) => {
        sessionStorage.setItem('session-id', res.guest_session_id);
        this.sessionId = res.guest_session_id;
      });
    }
    this.sessionId = sessionStorage.getItem('session-id');
  }

  getRatedList(): Promise<IGetRatedMoveList> {
    return this.getResource(`/guest_session/${this.sessionId}/rated/movies?api_key=${this._apiKey}`);
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
