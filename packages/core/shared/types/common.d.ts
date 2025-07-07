import '@tanstack/react-query'
import type { AxiosErrorType } from '../infrastructure/apiClient/types';

type Email = Branded<string, 'Email'>;
type UniqueId = Branded<string, 'UniqueId'>;
type DateTimeString = Branded<string, 'DateTimeString'>;
type PriceCents = Branded<number, 'PriceCents'>;


declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosErrorType
  }
}