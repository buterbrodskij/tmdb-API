import axios, {AxiosResponse} from 'axios';
import {RequestApi} from '@/interfaces/request.interfaces';
import {ITv} from '@/interfaces/tv.interfaces';
import {Movie} from '@/interfaces/movie.interfaces';

class TvResources {
  getPopularTv(page: number): Promise<AxiosResponse<Movie.IResponse<ITv.ItvList[]>>> {
    return axios.get(`${RequestApi.ApiKey.BASE_URL}tv/popular?api_key=${RequestApi.ApiKey.API_KEY}&page=${page}`) as Promise<AxiosResponse<Movie.IResponse<ITv.ItvList[]>>>;
  }
}

export const tvResources = new TvResources();