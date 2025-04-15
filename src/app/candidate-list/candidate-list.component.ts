import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import {CommonModule} from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [HttpClientModule,CommonModule],
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent {
  data: any[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.fetchData();
  }
  fetchData():void {
    
    const apiUrl = 'https://jsonplaceholder.typicode.com/users'; // Mock API URL
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
onButtonClick(item: any): void {
  console.log('Button clicked for item:', item);
  alert(`Button clicked for item: ${item.name}`);
  // 'https://jsonplaceholder.typicode.com/photos/1'; // Example mock API returning a URL

  this.http.get('https://jsonplaceholder.typicode.com/photos/1').subscribe({
    next: (response: any) => {
     let myURL=response.url;
      console.log('URL:', myURL);
      // Open the URL in a new tab 
      window.open(myURL, '_blank');
    },
    error: (error: any) => {
      this.errorMessage = 'Error fetching URL';
      console.error('Error fetching URL:', error);  
    },
  });
  // let myURL = '';
  // this.http.get(myURL).subscribe({
  //   next: (response: any) => {    
  //   })
}
}
