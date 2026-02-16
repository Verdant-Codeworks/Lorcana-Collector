import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../stores/auth.store';
import { authApi } from '../api/auth';
import type { RegisterDto, LoginDto } from '@illumineer-vault/shared';

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (data: LoginDto) => authApi.login(data),
    onSuccess: (res) => {
      setAuth(res.user, res.accessToken);
    },
  });
}

export function useRegister() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (data: RegisterDto) => authApi.register(data),
    onSuccess: (res) => {
      setAuth(res.user, res.accessToken);
    },
  });
}

export function useDeleteAccount() {
  const logout = useAuthStore((s) => s.logout);

  return useMutation({
    mutationFn: () => authApi.deleteAccount(),
    onSuccess: () => {
      logout();
    },
  });
}
