import { Component, Input, OnInit } from '@angular/core';
import { Cast } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-slideshow-actores',
  templateUrl: './slideshow-actores.component.html',
  styleUrls: ['./slideshow-actores.component.scss'],
})
export class SlideshowActoresComponent implements OnInit {

  @Input() actores: Cast[] = [];

  constructor() { }

  ngOnInit() {}

}
