import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { UserRole } from "@/lib/types";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { login } = useAuth();

  const handleLogin = async (credentials: { email: string; password: string }) => {
    if (!selectedRole) return;
    await login(credentials.email, credentials.password, selectedRole);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <div className="w-full max-w-md px-4 animate-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 slide-up">Dija Connect</h1>
          <p className="text-muted-foreground slide-up">Streamlined education platform</p>
        </div>

        {!selectedRole ? (
          <Card className="p-6 space-y-4 slide-up">
            <h2 className="text-xl font-semibold text-center mb-4">Choose your role</h2>
            <div className="grid gap-4">
              <Button
                variant="outline"
                className="h-16 card-hover"
                onClick={() => setSelectedRole("admin")}
              >
                Administrator
              </Button>
              <Button
                variant="outline"
                className="h-16 card-hover"
                onClick={() => setSelectedRole("teacher")}
              >
                Teacher
              </Button>
              <Button
                variant="outline"
                className="h-16 card-hover"
                onClick={() => setSelectedRole("student")}
              >
                Student
              </Button>
            </div>
          </Card>
        ) : (
          <div className="slide-up">
            <LoginForm role={selectedRole} onSubmit={handleLogin} onBack={() => setSelectedRole(null)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
