import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent {
  data: any[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit() {
    this.fetchData();
  }
  fetchData(): void {
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
  isFutureDate(dateTime: string): boolean {
    const now = new Date();
    const interviewDate = new Date(dateTime);
    return interviewDate > now; // Return true if the interview date is in the future
  }
  onButtonClick(item: any): void {
    console.log('Button clicked for item:', item);

    // Mock API to fetch the Jitsi URL
    this.http.get('https://jsonplaceholder.typicode.com/photos/1').subscribe({
      next: (response: any) => {
        let jitsiUrl = response.url; // Replace with the actual URL field from your API
        jitsiUrl="https://tenantid.8x8.vc/test#jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJtZWV0L[…]vhiwGEzWxxiojesgmsCnzLAdNl_vNViT9Grr18MisJQM8KpnId9aXIxIRA";
        console.log('Jitsi URL:', jitsiUrl);
        window.open(jitsiUrl, '_blank');
        // Navigate to the JitsiAudioComponent with the URL as a query parameter
        this.router.navigate(['/jitsi-audio'], { queryParams: { url: jitsiUrl } });
      },
      error: (error: any) => {
        this.errorMessage = 'Error fetching Jitsi URL';
        console.error('Error fetching Jitsi URL:', error);
      },
    });
  }
}
