'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Database, Lock, Mail } from 'lucide-react'
import { login } from '@/app/api/api'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from "react-hot-toast";

export function LoginForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const { email, password } = formData

        try {
            const response = await login(email, password)
            if (response.status === 200) {

                router.push("/upload");
            }
        } catch (error) {
            toast.error("Login failed", { icon: "❌" });
        }

    }



    const handleGoogleAuth = () => {
        console.log('Google auth initiated');
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        window.location.href = `${apiUrl}/auth/google`;
    }
    

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
            <Card className="bg-[#0A1929] border-none p-8 w-full max-w-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#8BA7B4] rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#E3D5B8] rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10">
                    <div className="flex flex-col items-center gap-6 mb-8">
                        <div className="bg-[#051421] p-4 rounded-full">
                            <Database className="w-16 h-16 text-[#8BA7B4]" />
                        </div>
                        <h1 className="text-[#E3D5B8] text-3xl font-bold">Welcome Back</h1>
                    </div>

                    <Button
                        onClick={handleGoogleAuth}
                        variant="outline"
                        className="w-full mb-6 font-mono bg-[#8BA7B4]  text-black  border-[#8BA7B4] hover:bg-[#8BA7B4] hover:text-black"
                    >
                        Continue with Google
                    </Button>

                    <div className="relative mb-6">
                        <Separator className="bg-[#8BA7B4]/20" />
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0A1929] px-2 text-[#8BA7B4] font-mono text-sm">
                            or
                        </span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-[#8BA7B4] font-mono flex items-center gap-2">
                                <Mail className="w-4 h-4" /> Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="bg-[#051421] border-[#8BA7B4]/20 text-white font-mono focus-visible:ring-[#8BA7B4]"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-[#8BA7B4] font-mono flex items-center gap-2">
                                <Lock className="w-4 h-4" /> Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="bg-[#051421] border-[#8BA7B4]/20 text-white font-mono focus-visible:ring-[#8BA7B4]"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-[#8BA7B4] hover:bg-[#7B97A4] text-black font-mono"
                        >
                            Sign In
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-[#8BA7B4] font-mono text-sm">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-white hover:text-[#E3D5B8] transition-colors">
                            Sign up
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    )
}

