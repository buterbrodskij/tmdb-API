import axios, {AxiosResponse} from 'axios';
import {RequestApi} from '@/interfaces/request.interfaces'
import {Movie} from '@/interfaces/movie.interfaces'

class MovieResources {
  getPopularFilms(page: number): Promise<AxiosResponse<Movie.IResponse<Movie.IMovieItem[]>>>   {
    return axios.get(`${RequestApi.ApiKey.BASE_URL}movie/popular?api_key=${RequestApi.ApiKey.API_KEY}&page=${page}`) as Promise<AxiosResponse<Movie.IResponse<Movie.IMovieItem[]>>>
  }
  
  getMoreInfo(id: number): Promise<AxiosResponse<Movie.IMoreInfo>> {
    return axios.get(`${RequestApi.ApiKey.BASE_URL}movie/${id}?api_key=${RequestApi.ApiKey.API_KEY}`) as Promise<AxiosResponse<Movie.IMoreInfo>>
  }

  getTopFilms(page: number): Promise<AxiosResponse<Movie.IResponse<Movie.IMovieItem[]>>>  {
    return axios.get(`${RequestApi.ApiKey.BASE_URL}movie/top_rated?api_key=${RequestApi.ApiKey.API_KEY}&page=${page}`) as Promise<AxiosResponse<Movie.IResponse<Movie.IMovieItem[]>>>
  }

  getUpcomingFilms(page: number): Promise<AxiosResponse<Movie.IResponse<Movie.IMovieItem[]>>>  {
    return axios.get(`${RequestApi.ApiKey.BASE_URL}movie/upcoming?api_key=${RequestApi.ApiKey.API_KEY}&page=${page}`) as Promise<AxiosResponse<Movie.IResponse<Movie.IMovieItem[]>>>
  }

  getFilmsOnSearch(query: string, page: number): Promise<AxiosResponse<Movie.IResponse<Movie.IMovieItem[]>>>  {
    return axios.get(`${RequestApi.ApiKey.BASE_URL}search/movie?api_key=${RequestApi.ApiKey.API_KEY}&query=${query}&page=${page}$include_adult=true`) as Promise<AxiosResponse<Movie.IResponse<Movie.IMovieItem[]>>>
  }

  getRecommendationsFilms(id: number): Promise<AxiosResponse<Movie.IResponse<Movie.IMovieItem[]>>>  {
    return axios.get(`${RequestApi.ApiKey.BASE_URL}movie/${id}/recommendations?api_key=${RequestApi.ApiKey.API_KEY}&page=1`) as Promise<AxiosResponse<Movie.IResponse<Movie.IMovieItem[]>>>
  }

  getCallBack(id: number): Promise<AxiosResponse<Movie.IResponse<any>>>  {
    return axios.get(`${RequestApi.ApiKey.BASE_URL}movie/${id}/reviews?api_key=${RequestApi.ApiKey.API_KEY}&page=1`) as Promise<AxiosResponse<Movie.IResponse<any>>>
  }
}


export const movieResources = new MovieResources();