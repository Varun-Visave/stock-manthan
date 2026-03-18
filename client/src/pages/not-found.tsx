import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-24 pb-12 w-full flex items-center justify-center bg-[#fdfaf6] dark:bg-[#101922]">
      <div className="bg-white dark:bg-card p-10 rounded-xl max-w-md mx-4 text-center shadow-lg border border-border">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Info className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-serif font-bold text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
        <p className="mb-8 text-muted-foreground">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link href="/">
          <Button size="lg" className="w-full">
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
