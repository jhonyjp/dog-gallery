import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DogApiResponse {
  [x: string]: any;
  breeds: {
    weight: {
      imperial: string;
      metric: string;
    };
    height: {
      imperial: string;
      metric: string;
    };
    id: number;
    name: string;
    country_code?: string;
    bred_for?: string;
    breed_group?: string;
    life_span: string;
    temperament: string;
    reference_image_id: string;
    origin?: string;
  }[];
  id: string;
  url: string;
  width: number;
  height: number;
}

@Injectable({
  providedIn: 'root'
})

export class DogApiService {
 private API_URL = 'https://api.thedogapi.com/v1/images/search';
  constructor(private http: HttpClient) { }

  getImagesRandomDog(): Observable<DogApiResponse> {
    return this.http.get<DogApiResponse>(this.API_URL);
  }


}
