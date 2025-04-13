import { Routes } from '@angular/router';
import { CandidateResumeUploadComponent } from './candidate-resume-upload/candidate-resume-upload.component';

export const routes: Routes = [
    {
        path: 'upload', component: CandidateResumeUploadComponent , pathMatch: 'full'
    },
];
export class AppRoutingModule{};