import { appInit } from './appInit';
import { tokenStore } from './shared/infrastructure/tokenStore';

// Render the app
appInit.startApp(tokenStore.setTokenAndUserType);
