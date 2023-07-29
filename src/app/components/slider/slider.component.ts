import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

    constructor(){}

    ngOnInit(): void {
      $("#logo").click(function (e) {
        e.preventDefault();
        $("header")
            .css("background", "green")
            .css("height", "50px");
   
      });
  
      (<any>$(".galeria")).bxSlider({
        mode: 'fade',
        captions: true,
        slideWith: 800
    });
    }
}
