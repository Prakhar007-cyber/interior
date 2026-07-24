import type { Metadata } from "next";
import { AuthExperience } from "@/components/auth/AuthExperience";

export const metadata: Metadata = {
  title: "Create Account — Client Portal",
};

export default function SignUpPage() {
  return <AuthExperience initialMode="signup" />;
}
