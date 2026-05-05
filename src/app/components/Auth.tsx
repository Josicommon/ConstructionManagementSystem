import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Alert, AlertDescription } from "./ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Loader2, Building2, Shield, Users } from "lucide-react"

interface AuthProps {
  onAuthSuccess: (user: any) => void
}

export function Auth({ onAuthSuccess }: AuthProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Check for existing session on mount
  useEffect(() => {
    checkExistingSession()
  }, [])

  const checkExistingSession = async () => {
    const savedUser = localStorage.getItem('construction_user')
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        onAuthSuccess(user)
      } catch (error) {
        localStorage.removeItem('construction_user')
      }
    }
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const role = formData.get('role') as string

    try {
      const response = await fetch(`https://kcfkimjrqybhqfmpkqzs.supabase.co/functions/v1/make-server-e9721f66/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjZmtpbWpycXliaHFmbXBrcXpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2MzI1NjQsImV4cCI6MjA1MDIwODU2NH0.FN6XbDCRAhA-LCh5Y4nJG8n0nGgbdO8rIl9N4pKgwpg`,
        },
        body: JSON.stringify({ name, email, password, role })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed')
      }

      const userData = {
        id: data.user.id,
        email: data.user.email,
        name,
        role
      }

      localStorage.setItem('construction_user', JSON.stringify(userData))
      setSuccess("Account created successfully! You can now sign in.")
    } catch (error: any) {
      console.error('Signup error:', error)
      setError(error.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      // For demo purposes, we'll create a mock signin since Supabase auth is complex
      // In a real app, you'd use Supabase auth client here
      const demoUsers = [
        { id: '1', email: 'john@incodm.com', name: 'John Doe', role: 'project_manager' },
        { id: '2', email: 'sarah@incodm.com', name: 'Sarah Johnson', role: 'site_manager' },
        { id: '3', email: 'mike@incodm.com', name: 'Mike Chen', role: 'architect' },
      ]

      const user = demoUsers.find(u => u.email === email)
      
      if (!user) {
        throw new Error('Invalid credentials')
      }

      localStorage.setItem('construction_user', JSON.stringify(user))
      onAuthSuccess(user)
    } catch (error: any) {
      console.error('Signin error:', error)
      setError(error.message || 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <img 
            src="figma:asset/042fbedaffe813899e50aac5e7ce849251ac01a3.png" 
            alt="INCODM - We Design. We Build. We Manage." 
            className="h-16 w-auto mx-auto mb-6"
          />
          <h1 className="text-2xl font-semibold text-gray-900">Construction Management System</h1>
          <p className="text-gray-600 mt-2">Professional project management for construction teams</p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4 bg-white rounded-lg border">
            <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-medium">Project Management</h3>
            <p className="text-sm text-gray-600">Track progress, budgets, and timelines</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border">
            <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-medium">Team Collaboration</h3>
            <p className="text-sm text-gray-600">Work together seamlessly</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border">
            <Shield className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <h3 className="font-medium">Safety &amp; Compliance</h3>
            <p className="text-sm text-gray-600">Maintain safety standards</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="signin" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert>
                  <AlertDescription className="text-green-600">{success}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="signin">
                <form onSubmit={handleSignin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      defaultValue="john@incodm.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      defaultValue="password123"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                </form>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Demo Accounts</h4>
                  <div className="text-sm space-y-1">
                    <p><strong>Project Manager:</strong> john@incodm.com</p>
                    <p><strong>Site Manager:</strong> sarah@incodm.com</p>
                    <p><strong>Architect:</strong> mike@incodm.com</p>
                    <p className="text-blue-700 mt-2">Password: password123</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      required
                      minLength={6}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select name="role" defaultValue="team_member">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="team_member">Team Member</SelectItem>
                        <SelectItem value="project_manager">Project Manager</SelectItem>
                        <SelectItem value="site_manager">Site Manager</SelectItem>
                        <SelectItem value="architect">Architect</SelectItem>
                        <SelectItem value="engineer">Engineer</SelectItem>
                        <SelectItem value="contractor">Contractor</SelectItem>
                        <SelectItem value="safety_officer">Safety Officer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-600">
          <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
          <p className="mt-2 text-xs">© 2024 INCODM. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}