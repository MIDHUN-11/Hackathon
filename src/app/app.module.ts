import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http"; // Import HttpClientModule
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { routes } from './app.routes';
// import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        LoginComponent, // Declare LoginComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule, // Add HttpClientModule here
        RouterModule.forRoot(routes), // Configure routes
    ],
    bootstrap: [LoginComponent] // Bootstrap LoginComponent
})
export class AppModule { }