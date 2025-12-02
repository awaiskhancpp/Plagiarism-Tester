"use client";
import { Raleway, DM_Sans } from "next/font/google";

const rw = Raleway({
  subsets: ["latin"],
  weight: ["200", "500", "900"],
});

const dmSans_light = DM_Sans({
  subsets: ["latin-ext"],
  weight: ["900"],
});

const dmSans_lighter = DM_Sans({
  subsets: ["latin"],
  weight: ["200"],
});

export default function TermsOfService() {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900">
      <button
        onClick={handleGoBack}
        className="fixed top-20 left-3 z-50 bg-gradient-to-r from-purple-900 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white rounded-full p-4 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 flex items-center justify-center cursor-pointer"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      {/* Hero Section */}
      <div className="w-full h-auto bg-gradient-to-r from-black to-gray-900 flex items-center justify-center pt-32 pb-20 px-4">
        <div className="text-center">
          <h2
            className={`${rw.className} text-3xl tracking-[15px] mb-6 text-gray-300`}
          >
            LEGAL AGREEMENT
          </h2>
          <h1
            className={`${rw.className} text-4xl md:text-5xl lg:text-7xl tracking-tighter text-white mb-4`}
          >
            Terms of{" "}
            <span className="bg-gradient-to-r from-purple-300 via-purple-500 to-purple-300 bg-clip-text text-transparent">
              Service
            </span>
          </h1>
          <p
            className={`${dmSans_lighter.className} text-gray-400 text-xl md:text-2xl mt-8 max-w-3xl mx-auto`}
          >
            By using SleuthInk, you agree to comply with these terms. Please
            read them carefully before proceeding.
          </p>
        </div>
      </div>

      {/* Last Updated */}
      <div className="w-full bg-gradient-to-r from-black to-gray-900 px-4">
        <div className="max-w-4xl mx-auto">
          <p className={`${dmSans_lighter.className} text-gray-500 text-lg`}>
            Effective Date: November 28, 2025 | Last Updated: November 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="w-full bg-gradient-to-r from-black to-gray-900 pb-32 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Section 1 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              1. Agreement to Terms
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-4`}
            >
              <p>
                By accessing and using SleuthInk ("Service," "Platform," "we,"
                "us," "our," or "Company"), you accept and agree to be bound by
                the terms, conditions, and notices contained in this Terms of
                Service Agreement ("Agreement"). If you do not agree to abide by
                all of these terms and conditions, you should not access or use
                this Service.
              </p>
              <p>
                These Terms of Service constitute a legal binding agreement
                between you ("User," "you," or "your") and SleuthInk Inc. This
                Agreement applies to all visitors, users, and others who access
                or use SleuthInk services, whether through the website, mobile
                applications, API, or other platforms.
              </p>
              <p>
                Your continued use of this Service following the posting of
                revised Terms means that you accept and agree to the changes. We
                reserve the right to modify these terms at any time. It is your
                responsibility to review these Terms periodically for updates.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              2. Use License & Intellectual Property Rights
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-6`}
            >
              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  A. License Grant
                </h3>
                <p>
                  SleuthInk grants you a limited, non-exclusive,
                  non-transferable, and revocable license to access and use the
                  Service for your personal, non-commercial purposes or for
                  legitimate educational and professional activities. This
                  license permits you to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>View and interact with the content on our Platform</li>
                  <li>Upload documents for plagiarism detection analysis</li>
                  <li>
                    Download reports and use results for authorized purposes
                  </li>
                  <li>Access features available to your subscription tier</li>
                  <li>Create and maintain a personal account</li>
                </ul>
              </div>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  B. Prohibited Uses
                </h3>
                <p>You explicitly agree NOT to:</p>
                <ul className="list-disc list-inside space-y-3 ml-4 mt-3">
                  <li>
                    Modify, copy, reproduce, or distribute any materials on
                    SleuthInk without written permission
                  </li>
                  <li>
                    Use automated scripts, bots, or scrapers to access or
                    extract data from our Service
                  </li>
                  <li>
                    Attempt to reverse engineer, decompile, disassemble, or
                    discover the source code of our Platform
                  </li>
                  <li>
                    Remove, alter, or obscure any copyright, trademark, or other
                    proprietary notices
                  </li>
                  <li>
                    Use the Service for illegal purposes, fraud, or any
                    violation of laws
                  </li>
                  <li>
                    Attempt to gain unauthorized access to the Service or its
                    systems
                  </li>
                  <li>
                    Interfere with or disrupt the normal operation of our
                    Platform
                  </li>
                  <li>
                    Sell, rent, lease, transfer, or otherwise commercialize the
                    Service
                  </li>
                  <li>
                    Use the Service for competitive intelligence or to develop
                    competing products
                  </li>
                  <li>
                    Harass, abuse, threaten, or defame other users or our staff
                  </li>
                  <li>Upload malware, viruses, or harmful code</li>
                  <li>
                    Create multiple accounts to circumvent subscription limits
                  </li>
                  <li>
                    Use the Service in any manner that violates these Terms
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  C. Intellectual Property
                </h3>
                <p>
                  All content, materials, design, text, graphics, logos, images,
                  video, audio, and software ("Content") on SleuthInk are the
                  property of SleuthInk or its content suppliers and are
                  protected by international copyright, trademark, and other
                  intellectual property laws. You may not use any Content
                  without our explicit written permission.
                </p>
                <p className="mt-4">
                  Your use of the Content is limited to viewing and using it on
                  the Platform. Any other use is strictly prohibited and may
                  violate intellectual property, defamation, or other applicable
                  laws.
                </p>
              </div>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  D. Your Content
                </h3>
                <p>
                  You retain ownership of any documents or content you submit to
                  SleuthInk for plagiarism detection ("User Content"). By
                  uploading User Content, you grant SleuthInk a worldwide,
                  non-exclusive, royalty-free license to use, process, analyze,
                  and store your User Content solely for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>Providing plagiarism detection services</li>
                  <li>Generating and delivering your plagiarism report</li>
                  <li>
                    Improving our detection algorithms (via aggregated,
                    anonymized data)
                  </li>
                  <li>Maintaining and backing up our Service</li>
                </ul>
                <p className="mt-4">
                  You warrant that you own or have the right to submit the User
                  Content and that it does not violate any intellectual property
                  rights of third parties.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              3. User Accounts & Responsibilities
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-6`}
            >
              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  A. Account Creation
                </h3>
                <p>
                  To use certain features of SleuthInk, you must create an
                  account and provide accurate, current, and complete
                  information. You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>
                    Provide truthful and accurate registration information
                  </li>
                  <li>Maintain and promptly update your account information</li>
                  <li>
                    Be at least 13 years old (or the age of digital consent in
                    your jurisdiction)
                  </li>
                  <li>
                    Use only one account per person (except as authorized for
                    institutional accounts)
                  </li>
                  <li>Not impersonate other individuals or organizations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  B. Account Security
                </h3>
                <p>
                  You are solely responsible for maintaining the confidentiality
                  of your account credentials (username, password, and
                  authentication tokens). You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>
                    Create a strong, unique password and change it regularly
                  </li>
                  <li>Not share your credentials with anyone</li>
                  <li>
                    Immediately notify us if you suspect unauthorized access
                  </li>
                  <li>
                    Accept all responsibility for activities under your account
                  </li>
                  <li>Log out of your account when using shared devices</li>
                </ul>
                <p className="mt-4">
                  SleuthInk is not liable for any loss or damage resulting from
                  your failure to protect your account credentials.
                </p>
              </div>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  C. Acceptable Use
                </h3>
                <p>
                  You agree to use SleuthInk only for legitimate, lawful
                  purposes. You will not:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on the rights of others</li>
                  <li>
                    Submit content that is defamatory, abusive, or harmful
                  </li>
                  <li>
                    Use the Service to facilitate academic dishonesty in
                    prohibited ways
                  </li>
                  <li>Engage in any form of harassment or discrimination</li>
                  <li>Attempt to disrupt or interfere with the Service</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              4. Subscription Plans & Payment
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-6`}
            >
              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  A. Subscription Plans
                </h3>
                <p>
                  SleuthInk offers various subscription tiers with different
                  features and usage limits. Plans include Free, Student,
                  Professional, and Enterprise options. Features and pricing are
                  subject to change at our discretion, with 30 days' notice.
                </p>
              </div>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  B. Payment & Billing
                </h3>
                <p>
                  You agree to pay all fees and charges associated with your
                  subscription plan. By providing payment information, you
                  authorize SleuthInk to charge your payment method for
                  recurring subscriptions. You agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>Maintain accurate and current billing information</li>
                  <li>Pay all charges in the currency specified at checkout</li>
                  <li>Accept responsibility for any taxes or fees</li>
                  <li>Resolve payment failures promptly</li>
                </ul>
              </div>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  C. Billing Cycle & Renewal
                </h3>
                <p>
                  Subscriptions automatically renew at the end of each billing
                  cycle (monthly or annually) unless cancelled. Charges will
                  appear on your billing statement. You will receive email
                  notification before each renewal.
                </p>
              </div>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  D. Cancellation & Refunds
                </h3>
                <p>
                  You may cancel your subscription at any time through your
                  account settings. Cancellation will take effect at the end of
                  your current billing cycle. No refunds are provided for
                  partially used subscription periods unless required by law.
                  Refund requests within 14 days of purchase may be considered.
                </p>
              </div>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  E. Price Changes
                </h3>
                <p>
                  SleuthInk reserves the right to modify pricing at any time.
                  Changes will take effect on the next renewal date. We will
                  provide at least 30 days' notice of material price increases.
                  Continued use after the notice period constitutes acceptance
                  of new pricing.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              5. Disclaimer of Warranties
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-4`}
            >
              <p className="font-bold text-purple-300">
                THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS.
              </p>
              <p>
                SLEUTHINK MAKES NO WARRANTIES, EXPRESS OR IMPLIED, REGARDING THE
                SERVICE, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside space-y-3 ml-4">
                <li>
                  Warranties of merchantability or fitness for a particular
                  purpose
                </li>
                <li>
                  Warranties that the Service will be uninterrupted, error-free,
                  or secure
                </li>
                <li>
                  Warranties regarding the accuracy, completeness, or
                  reliability of plagiarism detection results
                </li>
                <li>Warranties that defects will be corrected</li>
                <li>
                  Warranties that our Service is free from viruses or malicious
                  code
                </li>
              </ul>
              <p>
                Your use of the Service is at your own risk. SleuthInk does not
                guarantee 100% accuracy in plagiarism detection. You acknowledge
                that no detection system is perfect, and you will not rely
                solely on our Service for critical decisions.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              6. Limitation of Liability
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-4`}
            >
              <p className="font-bold text-purple-300">
                IN NO EVENT SHALL SLEUTHINK BE LIABLE FOR ANY INDIRECT,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY
                DAMAGES.
              </p>
              <p>
                This includes damages for loss of profits, goodwill, use, data,
                or other intangible losses, even if SleuthInk has been advised
                of the possibility of such damages. This limitation applies to
                all claims arising from or relating to your use of the Service.
              </p>
              <p>
                In jurisdictions that do not allow limitation of liability,
                SleuthInk's total liability to you shall not exceed the amount
                you paid to SleuthInk in the 12 months preceding the claim.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              7. Indemnification
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-4`}
            >
              <p>
                You agree to indemnify, defend, and hold harmless SleuthInk, its
                officers, directors, employees, agents, and successors from any
                and all claims, damages, liabilities, costs, and expenses
                (including attorney's fees) arising from:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your violation of these Terms of Service</li>
                <li>Your misuse of the Service</li>
                <li>Your User Content or its submission to the Service</li>
                <li>Your violation of any applicable laws or regulations</li>
                <li>Your violation of any third-party rights</li>
                <li>
                  Any claims by other users or third parties relating to your
                  account or actions
                </li>
              </ul>
            </div>
          </section>

          {/* Section 8 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              8. Service Modifications & Availability
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-4`}
            >
              <p>
                SleuthInk reserves the right to modify, suspend, or discontinue
                the Service or any part thereof at any time, with or without
                notice. We will attempt to provide notice of significant
                changes, but are not obligated to do so.
              </p>
              <p>
                We do not guarantee uninterrupted or error-free access.
                Maintenance, updates, or technical issues may cause temporary
                service interruptions. We will not be liable for any downtime,
                data loss, or other consequences of service interruptions.
              </p>
              <p>
                If we discontinue a paid service, we will provide reasonable
                notice and, where applicable, a refund of unused subscription
                fees.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              9. User Conduct & Violations
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-6`}
            >
              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  A. Prohibited Content
                </h3>
                <p>
                  You agree not to upload, submit, or display any content that:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>Infringes on intellectual property rights</li>
                  <li>
                    Contains illegal content or promotes illegal activities
                  </li>
                  <li>Is abusive, defamatory, obscene, or hateful</li>
                  <li>Constitutes spam or unsolicited commercial content</li>
                  <li>Contains malware, viruses, or harmful code</li>
                  <li>Violates the privacy or rights of others</li>
                </ul>
              </div>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  B. Enforcement
                </h3>
                <p>If you violate these Terms, SleuthInk may:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>Warn you of the violation</li>
                  <li>Suspend your account temporarily</li>
                  <li>Terminate your account permanently</li>
                  <li>Remove your content</li>
                  <li>Report the violation to law enforcement</li>
                  <li>Pursue legal action against you</li>
                </ul>
                <p className="mt-4">
                  These remedies are in addition to any other rights we may have
                  under law.
                </p>
              </div>
            </div>
          </section>

          {/* Section 10 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              10. Third-Party Links & Services
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-4`}
            >
              <p>
                SleuthInk may contain links to third-party websites and
                services. We do not control, endorse, or assume responsibility
                for third-party services. Your access to and use of third-party
                services are governed by their terms of service and privacy
                policies.
              </p>
              <p>
                We are not liable for any damages or losses arising from your
                use of third-party services or content. Please review
                third-party terms and policies before providing personal
                information.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              11. Governing Law & Dispute Resolution
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-6`}
            >
              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  A. Governing Law
                </h3>
                <p>
                  These Terms of Service are governed by and construed in
                  accordance with the laws of the jurisdiction where SleuthInk
                  is based, without regard to its conflict of law principles.
                  You agree to submit to the exclusive jurisdiction of the
                  courts in that location.
                </p>
              </div>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  B. Dispute Resolution
                </h3>
                <p>
                  Before initiating legal proceedings, you agree to attempt to
                  resolve disputes through good faith negotiation. If
                  negotiation fails, you agree to submit disputes to binding
                  arbitration rather than litigation, except for claims
                  concerning intellectual property, account suspension, or
                  service discontinuation.
                </p>
              </div>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  C. Class Action Waiver
                </h3>
                <p>
                  You agree not to participate in class action lawsuits against
                  SleuthInk. All disputes must be brought in an individual
                  capacity, not as a class or representative action.
                </p>
              </div>
            </div>
          </section>

          {/* Section 12 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              12. Changes to Terms
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-4`}
            >
              <p>
                SleuthInk may update these Terms of Service at any time. Changes
                will be effective immediately upon posting. Material changes
                will be communicated via email or prominent notice on our
                website. Your continued use of the Service after changes
                constitutes acceptance of the updated Terms.
              </p>
              <p>
                If you do not agree with updated Terms, you should discontinue
                using the Service and cancel your account.
              </p>
            </div>
          </section>

          {/* Section 13 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              13. Severability & Entire Agreement
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-4`}
            >
              <p>
                If any provision of these Terms is found to be unenforceable,
                that provision shall be severed, and the remaining provisions
                shall continue in full effect. These Terms, along with our
                Privacy Policy and Cookie Policy, constitute the entire
                agreement between you and SleuthInk and supersede all prior
                understandings and agreements.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
