import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula, } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';


@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {


  @Input() peliculasRecientes: Pelicula[];
  slideOpts = {
    slidesPerView: 3.5,
    freeMode: true,
    spaceBetween: -5
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async verDetalle( id: number) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }
}
