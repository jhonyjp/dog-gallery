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
  selectedFile!: File;
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
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      this.selectedFile = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  
  
  onUpload() {
    if (!this.selectedFile) {
      alert('Please select a file');
      return;
    }
    this.uploadService.postImageDog(this.selectedFile, this.subId).subscribe({
      next: (response) => {
       this.imagePreview = response.url;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  
}
}
      