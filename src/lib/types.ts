export type UserRole = "teacher" | "student" | "admin";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ModuleConfig {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  isCore: boolean;
  category: "learning" | "communication" | "assessment" | "administrative";
}
