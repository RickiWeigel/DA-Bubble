import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { HashLocationStrategy, PathLocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    {provide : PathLocationStrategy , useClass : HashLocationStrategy},
    provideRouter(routes),

    provideClientHydration(),
    provideAnimationsAsync(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'da-bubble-69930',
          appId: '1:279846477504:web:277674e030fa7c847e9725',
          storageBucket: 'da-bubble-69930.appspot.com',
          apiKey: 'AIzaSyAwq8sDBGwt-NOVSll7hfsBiJ-269x7qGs',
          authDomain: 'da-bubble-69930.firebaseapp.com',
          messagingSenderId: '279846477504',
          databaseURL:
            'https://da-bubble-69930-default-rtdb.europe-west1.firebasedatabase.app',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())),
    importProvidersFrom(provideDatabase(() => getDatabase())),
  ],
};
