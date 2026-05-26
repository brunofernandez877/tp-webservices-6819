import { Routes } from '@angular/router';
import { TraductorComponent } from './components/traductor/traductor';
import { Home } from './components/home/home';
import { PeliculasComponent } from './components/peliculas.component/peliculas.component';
import { AutosComponent } from './components/autos.component/autos.component';
import { ConversorComponent } from './components/conversor.component/conversor.component';
import { TextoAudioComponent } from './components/texto-audio.component/texto-audio.component';

export const routes: Routes = [
    {path: 'traductor', component: TraductorComponent},
    {path: 'home', component: Home},
    {path: 'peliculas', component: PeliculasComponent},
    {path: 'autos', component: AutosComponent},
    {path: 'conversor', component: ConversorComponent},
    {path: 'texto-audio', component: TextoAudioComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];
