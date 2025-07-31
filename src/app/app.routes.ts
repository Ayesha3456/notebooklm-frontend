import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { PdfUploadComponent } from './pdf-upload/pdf-upload.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
  { path: '', redirectTo: 'upload', pathMatch: 'full' },
  { path: 'upload', component: PdfUploadComponent },
  { path: 'chat', component: ChatComponent }
];

export const AppRoutesProvider = provideRouter(routes);
