import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DogApiResponse } from 'src/app/models/dog-api-response';

@Injectable({
  providedIn: 'root'
})

export class DogApiService {
 private API_URL = 'https://api.thedogapi.com/v1/images/search';
  constructor(private http: HttpClient) { }

  getImagesRandomDog(limit: number=15, breedId?: string): Observable<DogApiResponse[]> {
    let params = new HttpParams().set('limit', limit.toString()); 
    const headers = new HttpHeaders({ 
      'x-api-key': 'live_cm3phSOhXutxYYMDZ1X3qhT5PexIKSxYDQPOA5yl6TfHZq2zCGSYoFnwhxSYtlPN',
    'content-type': 'application/json'
    });
    return this.http.get<DogApiResponse[]>(this.API_URL, { headers, params });
  }


}
