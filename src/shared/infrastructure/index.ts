import { apiClientFactory } from './apiClient';
import { createRouter } from '@tanstack/react-router';
import { routeTree } from '~/routeTree.gen';
import { authStore } from '~/contexts/auth/useCases/login/authStore';

export const apiClient = apiClientFactory(
    'http://localhost:4000/api/v1/',
    authStore.getAccessToken,
    authStore.setAccessToken,
);

export const router = createRouter({ routeTree });
