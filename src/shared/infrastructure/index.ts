import { QueryClient } from '@tanstack/react-query';
import { apiClientFactory } from './apiClient';

export const apiClient = apiClientFactory('http://localhost:4000/api/v1/');
export const queryClient = new QueryClient();
