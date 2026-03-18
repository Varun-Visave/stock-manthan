import React from "react";

const ComplianceLayout = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="min-h-screen py-24 bg-gray-50">
    <div className="max-w-4xl mx-auto px-6 sm:px-8 bg-white border border-border shadow-sm rounded-xl overflow-hidden mt-8">
      <div className="p-10 space-y-6 text-foreground leading-relaxed">
        <h1 className="text-3xl font-bold text-primary mb-6 border-b pb-4">{title}</h1>
        <div className="space-y-4">
          {children}
        </div>
        <div className="mt-12 pt-6 border-t text-sm text-muted-foreground flex justify-between">
          <span>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>SEBI Registration: INH000XXXXXX</span>
        </div>
      </div>
    </div>
  </div>
);

export const SebiDisclosure = () => (
  <ComplianceLayout title="SEBI Registration Disclosure">
    <p>We are a SEBI Registered Research Analyst.</p>
    <p><strong>Registration Number:</strong> INH000XXXXXX</p>
    <p><strong>Registered Name:</strong> Stock Manthan Research Services</p>
    <p><strong>Principal Officer:</strong> Manthan</p>
    <p><strong>Address:</strong> Mumbai, Maharashtra, India</p>
    <h3 className="text-xl font-bold mt-6 mb-2">Standard Disclosures</h3>
    <p>The information and views presented here are prepared by Stock Manthan Research Services. We are firmly committed to being fully transparent with all our subscribers...</p>
  </ComplianceLayout>
);

export const ConflictOfInterest = () => (
  <ComplianceLayout title="Conflict of Interest Policy">
    <h3 className="text-xl font-bold mb-2">Policy Overview</h3>
    <p>A conflict of interest arises whenever our personal interests or those of our associates might interfere with the objective research advice provided to clients.</p>
    <ul className="list-disc pl-5 space-y-2 mt-4">
      <li>We do not have any holding in the recommended stock in the last 30 days.</li>
      <li>We do not have any material conflict of interest at the time of publication of the research report.</li>
      <li>We have not received any compensation from the subject company in the past twelve months.</li>
      <li>We do not serve as an officer, director or employee of the subject company.</li>
    </ul>
  </ComplianceLayout>
);

export const ResearchMethodology = () => (
  <ComplianceLayout title="Research Methodology">
    <h3 className="text-xl font-bold mb-2">Our Framework</h3>
    <p>Our equity research follows a strict fundamental analysis approach designed to identify high-quality businesses with sustainable competitive advantages.</p>
    <h4 className="font-semibold mt-4">1. Business Quality Analysis (Moat)</h4>
    <p>We assess the company's competitive advantage to determine long-term pricing power and ROCE stability.</p>
    <h4 className="font-semibold mt-4">2. Management Evaluation</h4>
    <p>We analyze capital allocation strategies, integrity, and corporate governance standards over past cycles.</p>
    <h4 className="font-semibold mt-4">3. Valuation Framework</h4>
    <p>We rely on discounted cash flows (DCF) and comparative multiple analysis to establish buy/sell price targets with a strong margin of safety.</p>
  </ComplianceLayout>
);

export const RiskDisclosure = () => (
  <ComplianceLayout title="Risk Disclosure">
    <p className="font-semibold text-red-600 mb-4">Investment in securities market are subject to market risks. Read all the related documents carefully before investing.</p>
    <p>Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.</p>
    <ul className="list-disc pl-5 space-y-2 mt-4">
      <li>Historical performance does not guarantee future results.</li>
      <li>Investments in equity and equity-related instruments are volatile and carry high risk.</li>
      <li>We do not offer any portfolio management services or execution services.</li>
      <li>Subscribers are solely responsible for all trading and investment decisions.</li>
    </ul>
  </ComplianceLayout>
);

export const GrievanceRedressal = () => (
  <ComplianceLayout title="Grievance Redressal Mechanism">
    <p>We value our clients and are committed to addressing all concerns promptly and fairly.</p>
    <h3 className="text-xl font-bold mt-6 mb-2">Level 1: Customer Support</h3>
    <p>For any queries or concerns regarding our services, please email: <strong>support@stockmanthan.com</strong></p>
    <h3 className="text-xl font-bold mt-6 mb-2">Level 2: Compliance Officer</h3>
    <p>If your grievance is not resolved within 7 working days, you can escalate it to our Compliance Email: <strong>manthanstock31@gmail.com</strong></p>
    <h3 className="text-xl font-bold mt-6 mb-2">Level 3: SEBI SCORES</h3>
    <p>If you remain dissatisfied, you may lodge your grievance on the SEBI SCORES portal at <strong>https://scores.gov.in/scores/Welcome.html</strong></p>
  </ComplianceLayout>
);

export const PrivacyPolicy = () => (
  <ComplianceLayout title="Privacy Policy">
    <p>Your privacy is important to us. This policy outlines how we collect, use, and protect your personal data.</p>
    <h3 className="text-xl font-bold mt-6 mb-2">Information Collected</h3>
    <p>When you register or subscribe, we collect your Name, Email, Phone Number, and Consent preferences.</p>
    <h3 className="text-xl font-bold mt-6 mb-2">How We Use Information</h3>
    <p>This information is purely used to fulfill the services offered, send research updates, and maintain regulatory compliance records.</p>
    <h3 className="text-xl font-bold mt-6 mb-2">Data Protection</h3>
    <p>We implement standard security measures to protect your data. We do not sell your personal data to third parties.</p>
  </ComplianceLayout>
);

export const RefundPolicy = () => (
  <ComplianceLayout title="Refund Policy">
    <p>Please refer to the detailed refund and cancellation guidelines before subscribing.</p>
    <h3 className="text-xl font-bold mt-6 mb-2">No Refunds</h3>
    <p>Given the nature of the research content and immediate access to premium insights upon subscription, <strong>all sales are final. We do not offer refunds</strong>.</p>
    <h3 className="text-xl font-bold mt-6 mb-2">Cancellations</h3>
    <p>You can choose not to renew your membership at the end of your billing cycle. However, no prorated refunds will be issued for partial usage.</p>
  </ComplianceLayout>
);

export const TermsAndConditions = () => (
  <ComplianceLayout title="Terms and Conditions">
    <p>By accessing Stock Manthan Research Services and subscribing to our platform, you agree to these legal terms.</p>
    <h3 className="text-xl font-bold mt-6 mb-2">Service Access</h3>
    <p>Membership access and credentials are for single-person use only. Sharing reports publicly or distributing content without explicit permission is strictly prohibited and can result in account termination without refund.</p>
    <h3 className="text-xl font-bold mt-6 mb-2">No Guarantee</h3>
    <p>Content provided is solely for educational and informational purposes. There are no guarantees of profit. Stock recommendations do not factor in individual risk capacities or financial goals.</p>
    <h3 className="text-xl font-bold mt-6 mb-2">Changes to Terms</h3>
    <p>We reserve the right to modify pricing, features, or terms. Any changes will be communicated via email prior to your renewal cycle.</p>
  </ComplianceLayout>
);
