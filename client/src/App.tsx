import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Philosophy from "@/pages/Philosophy";
import Community from "@/pages/Community";
import NotFound from "@/pages/not-found";
import Register from "@/pages/Register";
import Webinar from "@/pages/Webinar";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Admin from "@/pages/Admin";
import Payment from "@/pages/Payment";
import ForgotPassword from "@/pages/ForgotPassword";
import VerifyPending from "@/pages/VerifyPending";
import { SebiDisclosure, ConflictOfInterest, ResearchMethodology, RiskDisclosure, GrievanceRedressal, PrivacyPolicy, RefundPolicy, TermsAndConditions } from "@/pages/Compliance";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/philosophy" component={Philosophy} />
      <Route path="/community" component={Community} />
      <Route path="/register" component={Register} />
      <Route path="/verify-pending" component={VerifyPending} />
      <Route path="/webinar" component={Webinar} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/payment/:plan" component={Payment} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/admin" component={Admin} />
      <Route path="/compliance/sebi-disclosure" component={SebiDisclosure} />
      <Route path="/compliance/conflict-of-interest" component={ConflictOfInterest} />
      <Route path="/compliance/research-methodology" component={ResearchMethodology} />
      <Route path="/compliance/risk-disclosure" component={RiskDisclosure} />
      <Route path="/compliance/grievance-redressal" component={GrievanceRedressal} />
      <Route path="/compliance/privacy-policy" component={PrivacyPolicy} />
      <Route path="/compliance/refund-policy" component={RefundPolicy} />
      <Route path="/compliance/terms-and-conditions" component={TermsAndConditions} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1">
            <Router />
          </div>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;