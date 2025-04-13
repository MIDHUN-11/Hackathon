import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import {AppComponent} from './app.component'
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes'

@NgModule({
    declarations:[AppComponent],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}