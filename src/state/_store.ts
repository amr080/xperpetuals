import { configureStore } from '@reduxjs/toolkit';

import appMiddleware from './appMiddleware';
import localizationMiddleware from './localizationMiddleware';
import routerMiddleware from './routerMiddleware';
import tradeMiddleware from './tradeMiddleware';

import { accountSlice } from './account';
import { appSlice } from './app';
import { assetsSlice } from './assets';
import { configsSlice } from './configs';
import { dialogsSlice } from './dialogs';
import { inputsSlice } from './inputs';
import { layoutSlice } from './layout';
import { localizationSlice } from './localization';
import { navigationSlice } from './navigation';
import { perpetualsSlice } from './perpetuals';

import abacusStateManager from '@/lib/abacus';

export const commandMenuSlices = [layoutSlice, localizationSlice];

export const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    app: appSlice.reducer,
    assets: assetsSlice.reducer,
    configs: configsSlice.reducer,
    dialogs: dialogsSlice.reducer,
    inputs: inputsSlice.reducer,
    layout: layoutSlice.reducer,
    localization: localizationSlice.reducer,
    navigation: navigationSlice.reducer,
    perpetuals: perpetualsSlice.reducer,
  },

  middleware: (getDefaultMiddleware: any) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    appMiddleware,
    localizationMiddleware,
    routerMiddleware,
    tradeMiddleware,
  ],

  devTools: process.env.NODE_ENV !== 'production',
});

// Set store so (Abacus & v4-Client) classes can getState and dispatch
abacusStateManager.setStore(store);

export type RootStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
