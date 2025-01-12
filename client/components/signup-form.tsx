'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Database, Lock, Mail, User } from 'lucide-react'
import {signup} from '@/app/api/api'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    
  })
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { name, email, password } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
      return;
    }

    if (password.length < 8) {
      toast.error("Password should be at least 8 characters long");
      return;
    }

    if (name.trim() === "") {
      toast.error("Name cannot be empty");
      return;
    }

    const response = await signup(name, email, password);
    if (response.status === 201) {
      toast.success("Signup successful", { icon: "🎉" });
      router.push("/upload");
    }else{
      toast.error("Signup failed", { icon: "❌" });
    }

    //console.log('Signup form submitted:', formData)
  }

  const handleGoogleAuth = () => {
    console.log('Google auth initiated');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${apiUrl}/auth/google`;
}


  return (
    <div className="max-h-[100%] flex items-center justify-center p-1">
      <Card className="bg-[#0A1929] border-none p-8 w-full max-w-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#8BA7B4] rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#E3D5B8] rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col items-center gap-6 mb-4 ">
            <div className="bg-[#051421] p-1 rounded-full">
              <Database className="w-16 h-10 text-[#8BA7B4]" />
            </div>
            <h1 className="text-[#E3D5B8] text-3xl font-bold">Create Account</h1>
          </div>

          <Button
            onClick={handleGoogleAuth}
            variant="outline"
            className=" mb-6 w-full bg-[#8BA7B4] hover:bg-[#7B97A4] text-black font-mono"
          >
            Sign up with Google
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
<path d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z"></path>
</svg>
          </Button>

          <div className="relative mb-6">
            <Separator className="bg-[#8BA7B4]/20" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0A1929] px-2 text-[#8BA7B4] font-mono text-sm">
              or
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#8BA7B4] font-mono flex items-center gap-2">
                <User className="w-4 h-4" /> Name
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#051421] border-[#8BA7B4]/20 text-white font-mono focus-visible:ring-[#8BA7B4]"
                required
              />
            </div>

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

            {/* <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#8BA7B4] font-mono flex items-center gap-2">
                <Lock className="w-4 h-4" /> Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="bg-[#051421] border-[#8BA7B4]/20 text-white font-mono focus-visible:ring-[#8BA7B4]"
                required
              />
            </div> */}

            <Button
              type="submit"
              className="w-full bg-[#8BA7B4] hover:bg-[#7B97A4] text-black font-mono"
            >
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-[#8BA7B4] font-mono text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-white hover:text-[#E3D5B8] transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}

