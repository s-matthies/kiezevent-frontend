import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EventdetailComponent } from './eventdetail/eventdetail.component';
import { EventlistComponent } from './eventlist/eventlist.component';
import { CreateEventComponent } from './create-event/create-event.component';

export const routes: Routes = [
    { path: "event/:id", component: EventdetailComponent },
    { path: "event", component: EventlistComponent },
    { path: "create", component: CreateEventComponent },
    { path: "", component: HomeComponent, pathMatch: 'full'} // default route bedeutet das, wenn keine Route angegeben ist, dann wird HomeComponent geladen
    // pathMatch: 'full' bedeutet, dass die Route nur dann geladen wird, wenn der Pfad exakt übereinstimmt
];
