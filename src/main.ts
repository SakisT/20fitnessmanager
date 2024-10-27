import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NDaF5cWWtCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWH9fcnVUR2BfUURxWkE=');
// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(
//       // DI-based interceptors must be explicitly enabled.
//       withInterceptorsFromDi(),
//     ),
//     { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
//   ]
// });
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
