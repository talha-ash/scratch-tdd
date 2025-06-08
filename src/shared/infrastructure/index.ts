import { apiClientFactory } from './apiClient';
import { createRouter } from '@tanstack/react-router';

import { routeTree } from '~/routeTree.gen';

export const apiClient = apiClientFactory('http://localhost:4000/api/v1/');

export const router = createRouter({ routeTree });
