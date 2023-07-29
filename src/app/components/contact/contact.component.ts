import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

  constructor() { }

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
