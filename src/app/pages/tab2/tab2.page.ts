import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController, ToastController } from '@ionic/angular';
import { DetalleComponent } from 'src/app/components/detalle/detalle.component';
import { busquedaResultado } from 'src/app/interfaces/interfaces';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  textoBuscar = '';
  buscando = false;
  totalPeliculas: number;
  resultadoPeliculas: busquedaResultado[] = [];
  ideas: string[] = ['Spiderman', 'Avenger', 'El señor de los anillos', 'La vida es bella'];

  constructor(private moviesService: MoviesService,
              private modalCtrl: ModalController,
              private toastCtrl: ToastController) {}

  ngOnInit(): void {}

  buscar( event ) {

    const valor = event.detail.value;

    if(valor.length === 0) {
      this.buscando = false;
      this.resultadoPeliculas = [];
      return ;
    }

      this.resultadoPeliculas = [];
      this.buscando= true;
      this.cargarBusqueda(valor);

  }

  cargarBusqueda(valor: string) {
    this.moviesService.buscarPeliculas(valor).subscribe(resp => {

      this.totalPeliculas = resp.total_results;
      //console.log(this.totalPeliculas);

      this.resultadoPeliculas.push(...resp.results);
      console.log(this.resultadoPeliculas);
      this.buscando = false;

      if(resp.total_results === 0) {
        this.presentToast();
      }

    });
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'No se encontraron resultados...',
      duration: 2000,
      position: 'middle',
      color: 'light',
      cssClass: 'ion-text-center'
    });
    toast.present();
  }

  onClear(event) {
    this.textoBuscar = '';
    this.moviesService.busquedaPage = 0;
  }

  loadData(event) {

    this.cargarBusqueda(this.textoBuscar);
    if(event) {
      event.target.complete();
    }

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

