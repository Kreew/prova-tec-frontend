import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { SensoriListViewComponent } from './app/sensori-view.component';
import { NoteManagementComponent } from './app/note-management.component';

const routes: Routes = [
  { path: '', component: SensoriListViewComponent },
  { path: 'note-management', component: NoteManagementComponent },
];

bootstrapApplication(SensoriListViewComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes)
  ],
}).catch((err) => console.error(err));