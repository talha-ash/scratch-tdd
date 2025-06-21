import { apiClientFactory } from './apiClient';
import { createRouter } from '@tanstack/react-router';
import { authStore } from '~/contexts/auth/useCases/login/authStore';
import { routeTree } from '~/routeTree.gen';

export const router = createRouter({ routeTree });

export const apiClient = apiClientFactory(
    'http://localhost:4000/api/v1/',
    authStore.getAccessToken,
    authStore.setAccessToken,
);

