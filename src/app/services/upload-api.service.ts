import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadApiService {
  private API_URL = 'https://api.thedogapi.com/v1/images/upload';
    constructor(private http: HttpClient) { }
  
    postImageDog(file: File, subId: string): Observable<any> {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('sub_id', subId);

      
      
      const headers = new HttpHeaders({ 
        'x-api-key': 'live_cm3phSOhXutxYYMDZ1X3qhT5PexIKSxYDQPOA5yl6TfHZq2zCGSYoFnwhxSYtlPN',
      });

       // Log the request details
    console.log('Request URL:', this.API_URL);
    console.log('Request Headers:', headers);
    console.log('Form Data:', formData.get('file'), formData.get('sub_id'));

      return this.http.post(this.API_URL, formData, { headers });
    }

    

  
}