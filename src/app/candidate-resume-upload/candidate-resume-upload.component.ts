import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-candidate-resume-upload',
  imports: [],
  templateUrl: './candidate-resume-upload.component.html',
  styleUrl: './candidate-resume-upload.component.css'
})
export class CandidateResumeUploadComponent {
   selectedFile: File | null =null;
   uploadStatus = '';
   constructor(private http: HttpClient) {}
   onFileSelected(event : any){
    this.selectedFile = event.target.files[0];
   }
   onSubmit() {
    if(this.selectedFile){
      const formData = new FormData();
      formData.append('resume',this.selectedFile);
      this.http.post('/api/resume/upload', formData).subscribe({
        next: ()=> this.uploadStatus = "successfully uploaded the resume",
        error: ()=> this.uploadStatus = " error while uploading"
      });
    }
   }
}
