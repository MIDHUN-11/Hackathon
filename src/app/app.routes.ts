import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {CandidateListComponent} from './candidate-list/candidate-list.component';
import { JitsiAudioComponent } from './jitsi-audio/jitsi-audio.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'candidate-list',
        component: CandidateListComponent,
    },
    { path: 'jitsi-audio', component: JitsiAudioComponent },
];
