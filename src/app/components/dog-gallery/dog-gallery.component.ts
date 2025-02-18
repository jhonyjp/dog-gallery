import { Component, OnInit } from '@angular/core';
import { DogApiService, DogApiResponse } from 'src/app/services/dog-api.service';

@Component({
  selector: 'app-dog-gallery',
  templateUrl: './dog-gallery.component.html',
  styleUrls: ['./dog-gallery.component.css']
})
export class DogGalleryComponent implements OnInit {
dogImages: DogApiResponse[] = [];
  constructor(private dogApiService: DogApiService) { }

  ngOnInit(): void {
    this.getImages();
  }

  getImages(){
    this.dogApiService.getImagesRandomDog().subscribe(
      (response) => {
        this.dogImages = response;
      },
      (error) => {
        console.error(error);
      }

    )
  
  }

}
