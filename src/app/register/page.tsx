import { RegisterForm } from '@/components/auth/RegisterForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Registro - IA Panel',
  description: 'Crie sua conta no IA Panel',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-6 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">IA Panel</h1>
          <p className="text-muted-foreground">
            Crie sua conta para acessar o dashboard
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
} 