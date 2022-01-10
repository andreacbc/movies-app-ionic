/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable arrow-body-style */
import { Component } from '@angular/core';
import { PeliculaDetalle, Genre } from '../../interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from 'src/app/components/detalle/detalle.component';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [] ;
  favoritoGenero: any[];
  nuevoArray = [];

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  constructor(private dataLocal: DataLocalService,
              private movieService: MoviesService,
              private modalCtrl: ModalController) {}


 async ionViewWillEnter() {
    this.peliculas = await this.dataLocal.cargarFavoritos();
    console.log(this.peliculas);
    this.generos = await this.movieService.cargarGeneros();
    this.pelisPorGenero(this.generos, this.peliculas);
}

  pelisPorGenero(genero: Genre[], peliculas: PeliculaDetalle[]) {
    // eslint-disable-next-line arrow-body-style
    this.favoritoGenero = genero.map((key, index) => {
      return {
        genero: genero[index].name,
        pelis: this.pelisPorOrden(this.peliculas, genero[index].id)
      };
    });

    console.log('favoritoGenero', this.favoritoGenero);
  }

  pelisPorOrden(peliculas: PeliculaDetalle[], id: number) {

    const nuevasPeliculas = [];

      peliculas.forEach(function(x) {
      const existe = x.genres.find(g => g.id === id);

      if (existe) {
        nuevasPeliculas.push(x);
      }
      else {
        return;
      }
    });
    return nuevasPeliculas;
  }

  async verDetalle( id: number) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();

    await modal.onDidDismiss();
    this.ionViewWillEnter();
  }

}
