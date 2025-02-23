"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { signIn, signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; // Import a spinner

const roles = [
  { label: "Admin", value: "admin" },
  // { label: "Employee", value: "employee" },
  { label: "Customer", value: "customer" },
];

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false, // Prevents automatic redirection
      });

      if (res?.error) {
        console.log("Login failed:", res.error);
        alert("Invalid credentials. Please try again.");
        setLoading(false); // Stop loading
        return;
      }

      // Redirect based on role
      if (role === "admin") {
        router.push("/admin");
      } else if (role === "employee") {
        router.push("/employee");
      } else {
        router.push("/customer");
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      alert("An unexpected error occurred.");
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-200 to-zinc-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="mb-2 block">Select Role</Label>
              <RadioGroup
                value={role}
                onValueChange={setRole}
                className="flex items-center space-x-4"
              >
                {roles.map((r) => (
                  <div key={r.value} className="flex items-center space-x-1">
                    <RadioGroupItem value={r.value} id={r.value} />
                    <Label htmlFor={r.value}>{r.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="email" className="mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Label htmlFor="password" className="mb-2 block">
                Password
              </Label>
              <div className="flex flex-col justify-center items-center">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center pt-5"
                >
                  {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="animate-spin" size={20} />
                  <span>Logging in...</span>
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
