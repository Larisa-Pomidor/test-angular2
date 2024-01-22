import { Routes } from '@angular/router';
import { StudyComponent } from './study/study.component';
import { AddComponent } from './add/add.component';
import { CardsComponent } from './cards/cards.component';

export const routes: Routes = [
    {path: '', component: CardsComponent},
    {path: 'study', component: StudyComponent},
    {path: 'cards', component: CardsComponent},
    {path: 'add', component: AddComponent}
];
