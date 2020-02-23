import {Movie} from '@/interfaces/movie.interfaces'
import {IDialogStoreState} from '@/interfaces/dialog.interfaces'
import {ITv} from '@/interfaces/tv.interfaces'
export interface IAppState {
  

  //modules 
  dialog: IDialogStoreState;
  movie: Movie.IMovieState;
  tv: ITv.ITvStore;
}