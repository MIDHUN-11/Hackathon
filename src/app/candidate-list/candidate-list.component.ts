import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import {CommonModule} from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.css'
})
export class CandidateListComponent {
  data: any[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.fetchData();
  }
  fetchData():void {
    const apiUrl = 'https://api.example.com/candidates'; // Replace with your API URL
    this.http.get(apiUrl).subscribe({ 
      next: (response: any) => {
        this.data = response;
      },
      error: (error: any) => {
        this.errorMessage = 'Error fetching data';
        console.error('Error fetching data:', error);  
      },
    });
}
}