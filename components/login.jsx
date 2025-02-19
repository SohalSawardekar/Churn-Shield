"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HiEye, HiEyeOff } from "react-icons/hi";

const roles = [
  { label: "Admin", value: "admin" },
  { label: "Employee", value: "employee" },
  { label: "Customer", value: "customer" },
];

export default function LoginPage() {
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ role, email, password });
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
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                  required
                  className="pr-10" // Add padding to the right for the icon
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
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
