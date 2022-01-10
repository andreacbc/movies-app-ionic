import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaMB, PeliculaDetalle, RespuestaCredits, Busqueda, Genre } from '../interfaces/interfaces';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  public busquedaPage = 0;
  public generos: Genre[] = [];
  private popularesPage = 0;
  private categoriaActual = '';

  constructor(private http: HttpClient) { }

  getFeature(){

    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() +1;

    // console.log('hoy', hoy);
    // console.log('ultimoDia', ultimoDia);
    // console.log('mes', mes);

    let mesString;

    if(mes < 10) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    //console.log('mesString', mesString);

    const inicio = `${ hoy.getFullYear() }-${ mesString }-01`;
    const fin = `${ hoy.getFullYear() }-${ mesString }-${ ultimoDia}`;

    // console.log('inicio', inicio);
    // console.log('fin', fin);

    return this.ejecutarQuery<RespuestaMB>(`/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin}`);
  }

  getPopulares() {

    this.popularesPage++;

    const query= `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<RespuestaMB>(query);
  }

  getPeliculaDetalle(id: number) {
    const query= `/movie/${id}?a=1`;
    return this.ejecutarQuery<PeliculaDetalle>(query);
  }

  getActoresPelicula(id: number) {
    const query= `/movie/${id}/credits?a=1`;
    return this.ejecutarQuery<RespuestaCredits>(query);
  }

  buscarPeliculas(busqueda: string){

    if(this.categoriaActual === busqueda) {
      this.busquedaPage++;
    }
    else {
      this.busquedaPage = 1;
      this.categoriaActual = busqueda;
    }

    const query= `/search/movie?query=${busqueda}&page=${this.busquedaPage}`;
    return this.ejecutarQuery<Busqueda>(query);
  }

  cargarGeneros(): Promise<Genre[]> {

    return new Promise (resolve => {
      this.ejecutarQuery(`/genre/movie/list?a=1`).subscribe(resp => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        this.generos = resp['genres'];
        console.log(this.generos);
        resolve(this.generos);
      });
    });

  }

  private ejecutarQuery<T>(query: string) {

    query = URL + query;
    query += `&api_key=${ apiKey }&language=es&include_image_language=es`;

    //console.log(query);
    return this.http.get<T>(query);
  }
}
