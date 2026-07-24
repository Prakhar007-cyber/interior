import type { Metadata } from "next";
import { AuthExperience } from "@/components/auth/AuthExperience";

export const metadata: Metadata = {
  title: "Sign In — Client Portal",
};

export default function SignInPage() {
  return <AuthExperience initialMode="signin" />;
}
