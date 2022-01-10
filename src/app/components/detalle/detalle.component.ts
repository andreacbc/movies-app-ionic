/* eslint-disable quote-props */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { MoviesService } from 'src/app/services/movies.service';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @ViewChild(IonSlides, {static: false}) slides: IonSlides;
  @Input() id;

  slideOptsActores = {
    slidesPerView: 3.5,
    freeMode: true,
    spaceBetween: -5
  };

  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;
  existe: boolean;

  constructor(private moviesService: MoviesService,
              private modalCtrl: ModalController,
              private dataLocal: DataLocalService) {
  }

  async ngOnInit() {
    this.existe = await this.dataLocal.existePelicula(this.id);

    this.moviesService.getPeliculaDetalle(this.id).subscribe(resp => {
        this.pelicula = resp;
    });

    this.moviesService.getActoresPelicula(this.id).subscribe(resp => {
        this.actores = resp.cast;
    });
  }

  ionViewDidEnter(){
    this.slides.update();
  }

   regresar() {
   this.modalCtrl.dismiss( {
     'peliculasNuevas': this.pelicula
   });
  }

  favorito() {
   this.dataLocal.guardarPelicula(this.pelicula);
   this.existe = !this.existe;
  }

}
