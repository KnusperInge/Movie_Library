import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from './movie.model';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class MovieService {
  private URL_PATH =
    'https://movie-library-53ca6-default-rtdb.europe-west1.firebasedatabase.app/Movies';

  constructor(private http: HttpClient, private authS: AuthService) {
    this.loadMovies();
  }

  getMovie(id: string) {
    return this.http.get<Movie>(`${this.URL_PATH}/${id}.json`);
  }

  loadMovies() {
    return this.http
      .get<{ [key: string]: Movie }>(`${this.URL_PATH}.json`)
      .pipe(
        map((res) => {
          const movies = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              movies.push({ ...res[key], id: key });
            }
          }
          return movies;
        })
      );
  }

  saveMovie(newObject: Movie, MovieData: Movie) {
    let $User: string;
    this.authS.getUser().subscribe((user) => ($User = user));
    const body = JSON.stringify(this.createObj(newObject, MovieData));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.URL_PATH}.json?auth=${$User}`, body, {
      headers: headers,
    });
  }

  createObj(newObject, MovieData) {
    let Obj: {};
    if (MovieData[0].category == 'tv') {
      return (Obj = this.createSerieObj(newObject, MovieData));
    } else {
      return (Obj = this.createMovieObj(newObject, MovieData));
    }
  }

  createMovieObj(newObject, MovieData) {
    return {
      title: MovieData[0].title,
      category: MovieData[0].category,
      genre: MovieData[0].genre,
      description: MovieData[0].description,
      year: MovieData[0].year,
      img: MovieData[0].img,
      buyDate: newObject.buyDate,
      format: newObject.format,
      remarks: newObject.remarks,
    };
  }
  createSerieObj(newObject, MovieData) {
    return {
      title: MovieData[0].title,
      category: MovieData[0].category,
      genre: MovieData[0].genre,
      description: MovieData[0].description,
      year: MovieData[0].year,
      lastEpisode: MovieData[0].lastEpisode,
      seasons: MovieData[0].seasons,
      episodes: MovieData[0].episodes,
      status: MovieData[0].status,
      img: MovieData[0].img,
      buyDate: newObject.buyDate,
      format: newObject.format,
      remarks: newObject.remarks,
    };
  }
}
