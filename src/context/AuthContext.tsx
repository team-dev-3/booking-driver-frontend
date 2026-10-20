import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { loginAdmin, logoutAdmin } from '../features/admin/api/admin.api'
import type { AdminCredentials } from '../features/admin/types/admin.types'

interface AuthContextValue {
  token: string | null
  signIn: (credentials: AdminCredentials) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)

  const signIn = useCallback(async (credentials: AdminCredentials) => {
    const accessToken = await loginAdmin(credentials)
    setToken(accessToken)
  }, [])

  const signOut = useCallback(async () => {
    if (!token) {
      return
    }

    await logoutAdmin(token)
    setToken(null)
  }, [token])

  const value = useMemo(() => ({ token, signIn, signOut }), [token, signIn, signOut])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth phải được dùng bên trong AuthProvider.')
  }

  return context
}
