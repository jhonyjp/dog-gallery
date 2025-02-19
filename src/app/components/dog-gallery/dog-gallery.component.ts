import { Component, OnInit } from '@angular/core';
import { DogApiService } from 'src/app/services/dog-api.service';
import { UploadApiService } from 'src/app/services/upload-api.service';
import { DogApiResponse } from 'src/app/models/dog-api-response';

interface DogImage{ 
  url: string;
  breedName: string;
}

@Component({
  selector: 'app-dog-gallery',
  templateUrl: './dog-gallery.component.html',
  styleUrls: ['./dog-gallery.component.css']
})
export class DogGalleryComponent implements OnInit {
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  subId: string = '';
dogImages: DogImage [] = [];
  constructor(private dogApiService: DogApiService, private uploadService: UploadApiService) { }

  ngOnInit(): void {
    this.getImages();
  }

  getImages(): void {

    this.dogApiService.getImagesRandomDog().subscribe({
      next: (response: DogApiResponse[]) => {
        this.dogImages = response.map((dog) => ({
          url: dog.url || '',
          breedName: dog.breeds[0]?.name || 'Unknown'
        }));
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });

    
  }



  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement | null;
    if (fileInput && fileInput.files && fileInput.files[0]) {
      this.selectedFile = fileInput.files[0];
      this.imagePreview = null;
      };
    
  }
  
  
  onUpload() {
    if (!this.selectedFile) {
      console.log('Please select a file');
      return;
    }

    this.uploadService.postImageDog(this.selectedFile, this.subId).subscribe({
      next: (response) => {
        this.imagePreview = response.url;
        console.log('Image uploaded successfully');
        this.selectedFile = null;
      },
      error: (error) => {
        console.error('There was an error!', error);
        if (error.error) {
          console.error('Error details:', error.error);
        }
      }
    });
  
}

}
      