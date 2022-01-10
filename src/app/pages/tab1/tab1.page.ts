import { Component, OnInit } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
      this.moviesService.getFeature().subscribe(resp => {
        //console.log(resp);
        this.peliculasRecientes = resp.results;
      });

      this.getPopulares();
  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this.moviesService.getPopulares().subscribe(resp =>{

      /*Esto se hizo porque con el this.populares.push(...resp.results) no se agregaban correctamente por el pipe
       por tal motivo se creo una constante que lo que hizo fue concatenar todo en un vuevo arreglo temporal*/
      const arrTemp = [...this.populares, ...resp.results];
      this.populares = arrTemp;
    });
  }
}
