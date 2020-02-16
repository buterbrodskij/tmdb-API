import {Movie} from '@/interfaces/movie.interfaces'
import {IDialogStoreState} from '@/interfaces/dialog.interfaces'
export interface IAppState {
  

  //modules 
  dialog: IDialogStoreState;
  movie: Movie.IMovieState;
}