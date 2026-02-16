import { api } from './client';
import type { LoginResponse, AuthUser, RegisterDto, LoginDto } from '@illumineer-vault/shared';

export const authApi = {
  register: (data: RegisterDto) =>
    api.post<LoginResponse>('/auth/register', data).then((r) => r.data),

  login: (data: LoginDto) =>
    api.post<LoginResponse>('/auth/login', data).then((r) => r.data),

  getMe: () =>
    api.get<AuthUser>('/auth/me').then((r) => r.data),

  exportData: () =>
    api.get('/auth/export').then((r) => r.data),

  deleteAccount: () =>
    api.delete('/auth/account').then((r) => r.data),
};
