import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() peliculasRecientes: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();

  slideOptsPares = {
    slidesPerView: 3.5,
    freeMode: true,
    spaceBetween: -5
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onClick() {
    this.cargarMas.emit();
  }

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
