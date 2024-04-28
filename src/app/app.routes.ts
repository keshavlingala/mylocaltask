import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {TrashComponent} from "./trash/trash.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'trash', component: TrashComponent},
  {path: '**', redirectTo: ''}
];
