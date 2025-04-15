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
    this.data = [
      { id: 1, name: 'John Doe', title: 'Software Engineer' },
      { id: 2, name: 'Jane Smith', title: 'Product Manager' },
      { id: 3, name: 'Alice Johnson', title: 'UX Designer' },
    ];
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
}
}
