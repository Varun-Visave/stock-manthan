import { Link } from "wouter";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyPending() {
  return (
    <div className="min-h-screen pt-32 pb-12 flex items-center justify-center bg-gray-50 dark:bg-[#0a0f16]">
      <div className="bg-white dark:bg-card p-10 rounded-2xl shadow-xl border border-border w-full max-w-md mx-4 text-center space-y-6">
        <div className="mx-auto w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center">
          <Mail size={40} className="animate-pulse" />
        </div>
        
        <h1 className="text-3xl font-serif font-bold text-foreground">Check Your Email</h1>
        <p className="text-muted-foreground leading-relaxed">
          We've sent a verification link to your email address. Please click the link to activate your account.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl text-sm text-left border border-blue-100 flex gap-3">
          <CheckCircle className="text-blue-500 shrink-0 w-5 h-5" />
          <p className="text-blue-800 dark:text-blue-200">
            Once verified, you'll be automatically redirected to your dashboard where you can access all the free and premium research.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <p className="text-xs text-muted-foreground">
            Didn't receive the email? Check your spam folder or contact <a href="mailto:support@stockmanthan.com" className="text-primary hover:underline">support@stockmanthan.com</a>
          </p>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/login">
              Already verified? Go to Log In <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
