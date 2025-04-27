import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { CreateMonacoConfig } from './app/monaco-editor.config';

CreateMonacoConfig();

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
