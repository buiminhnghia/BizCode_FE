import {
  ApplicationConfig,
  EnvironmentInjector,
  importProvidersFrom,
  inject,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideEnvironmentInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeuix/themes/aura';
import { icons, LucideAngularModule } from 'lucide-angular';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { provideToastr } from 'ngx-toastr';
import { vi } from 'primelocale/vi.json';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
// import { authInitializer } from './core/initializers/auth.initializer';
// import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withInMemoryScrolling()),
    provideEnvironmentNgxMask(),
    importProvidersFrom(LucideAngularModule.pick(icons)),
    provideHttpClient(),//(withInterceptors([errorInterceptor])),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    // provideEnvironmentInitializer(() => {
    //   const injector = inject(EnvironmentInjector);
    //   authInitializer(injector);
    // }),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'app-styles, another-css-library',
          },
          prefix: 'p',
          darkModeSelector: 'light',
        },
      },
      translation: vi,
    }),
    { provide: LOCALE_ID, useValue: 'vi-VN' },
  ],
};
