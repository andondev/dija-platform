import { createContext, useContext, useState, ReactNode } from "react";
import { User, UserRole } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Simulate login process
  const login = async (email: string, password: string, role: UserRole) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate basic validation
      if (email && password) {
        const fakeUser: User = {
          id: "1",
          email,
          role,
          name: email.split("@")[0],
        };
        setUser(fakeUser);
        toast.success("Login successful!");
        
        // Redirect based on role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "teacher") {
          navigate("/teacher/dashboard");
        } else {
          navigate("/student/dashboard");
        }
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
