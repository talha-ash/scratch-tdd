import { CoreShared } from 'core';
import { appInit } from './appInit';
// Render the app
appInit.startApp(CoreShared.tokenStore.setTokenAndUserType);
