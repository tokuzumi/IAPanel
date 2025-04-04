import { LoginForm } from '@/components/auth/LoginForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - IA Panel',
  description: 'Faça login para acessar o IA Panel',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-6 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">IA Panel</h1>
          <p className="text-muted-foreground">
            Faça login para acessar o dashboard
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
} 