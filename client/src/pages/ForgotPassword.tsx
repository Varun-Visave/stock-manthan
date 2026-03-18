import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50 dark:bg-[#0a0f16]">
      <div className="bg-white dark:bg-card p-10 rounded-xl shadow-sm border border-border w-full max-w-md mx-4 text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Forgot Password</h1>
        <p className="text-muted-foreground mb-8">
          This feature is coming soon. Please contact support at manthanstock31@gmail.com if you need immediate assistance.
        </p>
        <Link href="/login">
          <Button className="w-full">Back to Login</Button>
        </Link>
      </div>
    </div>
  );
}
