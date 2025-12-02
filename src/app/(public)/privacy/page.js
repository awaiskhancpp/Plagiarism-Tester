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

export default function PrivacyPolicy() {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900">
      {/* Hero Section */}
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
      <div className="w-full h-auto bg-gradient-to-r from-black to-gray-900 flex items-center justify-center pt-32 pb-20 px-4">
        <div className="text-center">
          <h2
            className={`${rw.className} text-3xl tracking-[15px] mb-6 text-gray-300`}
          >
            OUR COMMITMENT
          </h2>
          <h1
            className={`${rw.className} text-4xl md:text-5xl lg:text-7xl tracking-tighter text-white mb-4`}
          >
            Privacy{" "}
            <span className="bg-gradient-to-r from-purple-300 via-purple-500 to-purple-300 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          <p
            className={`${dmSans_lighter.className} text-gray-400 text-xl md:text-2xl mt-8 max-w-3xl mx-auto`}
          >
            Your privacy matters to us. We're committed to protecting your
            personal information and maintaining transparency about how we
            collect, use, and safeguard your data.
          </p>
        </div>
      </div>

      {/* Last Updated */}
      <div className="w-full bg-gradient-to-r from-black to-gray-900 px-4">
        <div className="max-w-4xl mx-auto">
          <p className={`${dmSans_lighter.className} text-gray-500 text-lg`}>
            Last Updated: November 2025 | Effective Date: November 28, 2025
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
              1. Introduction & Overview
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-4`}
            >
              <p>
                SleuthInk ("Company," "we," "us," "our," or "Organization")
                operates the plagiarism detection platform available at
                sleuthink.com and related applications (collectively, the
                "Service"). We are committed to protecting your privacy and
                ensuring you have a positive experience on our platform.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website, use our
                applications, and engage with our services. Please read this
                privacy policy carefully. If you do not agree with our policies
                and practices, please do not use our Service.
              </p>
              <p>
                We are dedicated to maintaining the highest standards of data
                protection and compliance with international privacy regulations
                including GDPR, CCPA, and other applicable data protection laws.
                Your trust is paramount to us, and we take every measure to
                ensure your information is handled with care and integrity.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              2. Information We Collect
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-6`}
            >
              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-3">
                  A. Information You Provide Directly
                </h3>
                <p className="mb-4">
                  We collect information that you voluntarily provide to us when
                  you create an account, use our services, and interact with our
                  platform:
                </p>
                <ul className="list-disc list-inside space-y-3 ml-4">
                  <li>
                    <strong>Account Registration:</strong> Name, email address,
                    password, institution/organization name, role (student,
                    teacher, developer), and phone number
                  </li>
                  <li>
                    <strong>Profile Information:</strong> Profile picture, bio,
                    preferences, and communication settings
                  </li>
                  <li>
                    <strong>Submitted Documents:</strong> Text documents,
                    essays, research papers, code files, and other content you
                    upload for plagiarism detection
                  </li>
                  <li>
                    <strong>Payment Information:</strong> Billing address,
                    payment method details (processed securely through
                    third-party payment processors)
                  </li>
                  <li>
                    <strong>Communication Data:</strong> Messages, feedback,
                    support requests, survey responses, and correspondence with
                    our team
                  </li>
                  <li>
                    <strong>Usage Preferences:</strong> Language preferences,
                    notification settings, integration preferences, and account
                    customization choices
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-3">
                  B. Information Collected Automatically
                </h3>
                <p className="mb-4">
                  When you access and use our Service, we automatically collect
                  certain information about your device and usage patterns:
                </p>
                <ul className="list-disc list-inside space-y-3 ml-4">
                  <li>
                    <strong>Device Information:</strong> Device type, operating
                    system, browser type and version, device identifiers, and
                    device settings
                  </li>
                  <li>
                    <strong>Access Information:</strong> IP address,
                    referring/exit pages, pages viewed, date and time stamps,
                    and click patterns
                  </li>
                  <li>
                    <strong>Usage Analytics:</strong> Features accessed, time
                    spent on specific pages, search queries, document processing
                    metrics, and engagement patterns
                  </li>
                  <li>
                    <strong>Location Data:</strong> General geographic location
                    based on IP address (city/region level, not precise
                    location)
                  </li>
                  <li>
                    <strong>Cookies & Similar Technologies:</strong> Information
                    from cookies, web beacons, pixels, and similar tracking
                    technologies as described in our Cookie Policy
                  </li>
                  <li>
                    <strong>Performance Data:</strong> Error logs, crash
                    reports, performance metrics, and diagnostic information to
                    improve our Service
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-3">
                  C. Information from Third Parties
                </h3>
                <p className="mb-4">
                  We may receive information about you from third-party sources:
                </p>
                <ul className="list-disc list-inside space-y-3 ml-4">
                  <li>
                    <strong>Social Media Platforms:</strong> If you choose to
                    link your account or sign up via social media (Google,
                    Microsoft, etc.), we receive profile information with your
                    consent
                  </li>
                  <li>
                    <strong>Institutional Partners:</strong> Educational
                    institutions may provide student information when their
                    organization uses our Service
                  </li>
                  <li>
                    <strong>Service Providers:</strong> Payment processors,
                    analytics providers, and other vendors may share information
                    with us
                  </li>
                  <li>
                    <strong>Public Sources:</strong> We may obtain publicly
                    available information for verification and compliance
                    purposes
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              3. How We Use Your Information
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-6`}
            >
              <p>
                We use the information we collect for various purposes related
                to providing, maintaining, and improving our Service:
              </p>
              <div className="space-y-4">
                <div className="bg-gray-900/50 p-6  border border-purple-500/20">
                  <h4 className="text-purple-300 font-bold mb-3">
                    Service Delivery & Operations
                  </h4>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>
                      Processing your plagiarism detection requests and
                      generating detailed reports
                    </li>
                    <li>
                      Managing your account and providing customer support
                    </li>
                    <li>Processing payments and managing your subscription</li>
                    <li>Verifying user identity and preventing fraud</li>
                    <li>
                      Maintaining and troubleshooting our platform's
                      functionality
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 p-6  border border-purple-500/20">
                  <h4 className="text-purple-300 font-bold mb-3">
                    Communication & Notifications
                  </h4>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>
                      Sending transactional emails (account confirmations,
                      receipt notifications)
                    </li>
                    <li>
                      Notifying you about changes to our Service or policies
                    </li>
                    <li>
                      Responding to your inquiries and customer support requests
                    </li>
                    <li>
                      Sending newsletters and marketing communications (with
                      your consent)
                    </li>
                    <li>
                      Providing important security alerts and notifications
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 p-6  border border-purple-500/20">
                  <h4 className="text-purple-300 font-bold mb-3">
                    Improvement & Analytics
                  </h4>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>
                      Analyzing usage patterns to improve our detection
                      algorithms
                    </li>
                    <li>Understanding user behavior and preferences</li>
                    <li>Developing new features and functionality</li>
                    <li>
                      Conducting research and analytics on plagiarism trends
                    </li>
                    <li>Optimizing user experience and interface design</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 p-6  border border-purple-500/20">
                  <h4 className="text-purple-300 font-bold mb-3">
                    Legal & Compliance
                  </h4>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>Complying with legal obligations and court orders</li>
                    <li>
                      Protecting the security and integrity of our Service
                    </li>
                    <li>Enforcing our Terms of Service and other agreements</li>
                    <li>Preventing fraud, abuse, and illegal activity</li>
                    <li>
                      Establishing, exercising, and defending legal claims
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              4. Data Security & Encryption
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-4`}
            >
              <p>
                Your security is a top priority for us. We implement
                comprehensive security measures to protect your personal
                information and documents from unauthorized access, alteration,
                disclosure, or destruction.
              </p>
              <div className="bg-gradient-to-r from-purple-900/20 to-transparent p-6  border border-purple-500/30 space-y-4">
                <p>
                  <strong className="text-purple-300">
                    Encryption in Transit:
                  </strong>{" "}
                  All data transmitted between your device and our servers is
                  encrypted using SSL/TLS encryption protocols (HTTPS). This
                  ensures that your information cannot be intercepted or
                  eavesdropped during transmission.
                </p>
                <p>
                  <strong className="text-purple-300">
                    Encryption at Rest:
                  </strong>{" "}
                  Sensitive data stored on our servers, including documents and
                  personal information, is encrypted using AES-256 encryption.
                  Only authorized personnel with encryption keys can access this
                  data.
                </p>
                <p>
                  <strong className="text-purple-300">
                    Multi-Factor Authentication:
                  </strong>{" "}
                  We support multi-factor authentication (MFA) to add an
                  additional layer of security to your account. We encourage all
                  users to enable MFA.
                </p>
                <p>
                  <strong className="text-purple-300">Access Controls:</strong>{" "}
                  Our systems employ strict role-based access controls limiting
                  employee access to personal data only when necessary for job
                  functions.
                </p>
                <p>
                  <strong className="text-purple-300">
                    Regular Security Audits:
                  </strong>{" "}
                  We conduct regular security assessments, penetration testing,
                  and vulnerability scans to identify and address potential
                  security risks.
                </p>
              </div>
              <p>
                However, no security system is impenetrable. While we strive to
                use commercially acceptable means to protect your information,
                we cannot guarantee absolute security. You use our Service at
                your own risk, and you are responsible for maintaining the
                confidentiality of your account credentials.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              5. Data Retention & Deletion
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-4`}
            >
              <p>
                We maintain a strict data retention policy designed to minimize
                data storage and maximize your privacy. We retain your
                information only for as long as necessary to provide our Service
                and fulfill the purposes outlined in this Privacy Policy.
              </p>
              <div className="bg-gray-900/50 p-6  border border-purple-500/20 space-y-4">
                <div>
                  <h4 className="text-purple-300 font-bold mb-2">
                    Documents Submitted for Analysis
                  </h4>
                  <p>
                    Original documents are deleted immediately after report
                    generation. Reports are retained for your account history
                    and are deleted upon account termination or as per your
                    request.
                  </p>
                </div>
                <div>
                  <h4 className="text-purple-300 font-bold mb-2">
                    Account Information
                  </h4>
                  <p>
                    Your account information is retained while your account is
                    active. Upon account deletion, we remove all personal data
                    within 30 days, except where required by law.
                  </p>
                </div>
                <div>
                  <h4 className="text-purple-300 font-bold mb-2">
                    Usage Analytics
                  </h4>
                  <p>
                    Aggregated usage data is retained for 24 months to improve
                    our Service. Personally identifiable analytics data is
                    deleted after 90 days.
                  </p>
                </div>
                <div>
                  <h4 className="text-purple-300 font-bold mb-2">
                    Legal & Compliance Records
                  </h4>
                  <p>
                    We may retain certain data for 7 years to comply with legal
                    obligations, tax regulations, and fraud prevention
                    requirements.
                  </p>
                </div>
              </div>
              <p>
                You may request deletion of your account and associated data at
                any time by contacting our privacy team. We will process
                deletion requests within 30 days, subject to legal and
                contractual obligations.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              6. Sharing & Disclosure of Information
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-6`}
            >
              <p>
                We are committed to protecting your privacy and rarely share
                your personal information with third parties. However, there are
                specific circumstances where information may be shared:
              </p>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  We DO NOT Share Information With:
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Marketing companies or advertisers for profiling or targeted
                    advertising
                  </li>
                  <li>Data brokers or third-party data sellers</li>
                  <li>
                    Your submitted documents are never shared with external
                    plagiarism databases
                  </li>
                  <li>Social media platforms unless you authorize it</li>
                  <li>Competitors or other commercial entities</li>
                </ul>
              </div>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  We MAY Share Information With:
                </h3>
                <ul className="list-disc list-inside space-y-3 ml-4">
                  <li>
                    <strong>Service Providers:</strong> Payment processors
                    (Stripe, PayPal), cloud hosting providers, analytics
                    services, and customer support platforms who process data
                    under strict confidentiality agreements
                  </li>
                  <li>
                    <strong>Institutional Partners:</strong> If your account is
                    created through an educational institution, basic
                    performance data may be shared with your institution
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> Government agencies,
                    law enforcement, or courts when required by law, subpoena,
                    or legal process
                  </li>
                  <li>
                    <strong>Business Transactions:</strong> In the event of
                    merger, acquisition, bankruptcy, or sale of assets, your
                    information may be transferred (you will be notified)
                  </li>
                  <li>
                    <strong>Safety & Security:</strong> When necessary to
                    protect the rights, property, and safety of our Company,
                    users, and the public
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              7. Your Privacy Rights & Choices
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-6`}
            >
              <p>
                Depending on your location and applicable laws, you may have
                certain rights regarding your personal information:
              </p>

              <div className="space-y-4">
                <div className="bg-gray-900/50 p-6  border border-purple-500/20">
                  <h4 className="text-purple-300 font-bold mb-3">
                    Right to Access
                  </h4>
                  <p>
                    You have the right to request a copy of the personal
                    information we hold about you and understand how we use it.
                  </p>
                </div>

                <div className="bg-gray-900/50 p-6  border border-purple-500/20">
                  <h4 className="text-purple-300 font-bold mb-3">
                    Right to Rectification
                  </h4>
                  <p>
                    You can request correction of inaccurate or incomplete
                    information we maintain about you.
                  </p>
                </div>

                <div className="bg-gray-900/50 p-6  border border-purple-500/20">
                  <h4 className="text-purple-300 font-bold mb-3">
                    Right to Erasure
                  </h4>
                  <p>
                    You may request deletion of your personal data, subject to
                    certain exceptions for legal compliance and legitimate
                    business purposes.
                  </p>
                </div>

                <div className="bg-gray-900/50 p-6  border border-purple-500/20">
                  <h4 className="text-purple-300 font-bold mb-3">
                    Right to Data Portability
                  </h4>
                  <p>
                    You can request your data in a machine-readable format and
                    have it transferred to another service provider.
                  </p>
                </div>

                <div className="bg-gray-900/50 p-6  border border-purple-500/20">
                  <h4 className="text-purple-300 font-bold mb-3">
                    Right to Object
                  </h4>
                  <p>
                    You can opt-out of certain data processing activities,
                    including marketing communications and analytics.
                  </p>
                </div>

                <div className="bg-gray-900/50 p-6  border border-purple-500/20">
                  <h4 className="text-purple-300 font-bold mb-3">
                    Right to Withdraw Consent
                  </h4>
                  <p>
                    Where we rely on your consent to process data, you can
                    withdraw that consent at any time.
                  </p>
                </div>
              </div>

              <p>
                To exercise any of these rights, please contact our privacy team
                at privacy@sleuthink.com. We will respond to your request within
                30 days or as required by applicable law.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              8. International Data Transfers
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-4`}
            >
              <p>
                SleuthInk operates globally, and your information may be
                transferred to, stored in, and processed in countries other than
                your country of residence. These countries may have data
                protection laws that differ from those of your home country.
              </p>
              <p>
                When we transfer personal information internationally, we
                implement appropriate safeguards including Standard Contractual
                Clauses, adequacy decisions, and your explicit consent where
                required by law. By using our Service, you consent to the
                transfer of your information to countries outside your country
                of residence.
              </p>
              <p>
                If you are located in the European Union, UK, or other
                jurisdictions with strict data protection requirements, we
                ensure compliance with GDPR and equivalent regulations through
                Privacy Shield, Standard Contractual Clauses, and other approved
                mechanisms.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              9. Children's Privacy
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-4`}
            >
              <p>
                Our Service is not intended for children under the age of 13 (or
                the applicable age of digital consent in your jurisdiction). We
                do not knowingly collect personal information from children
                under 13. If we become aware that we have collected information
                from a child under 13, we will promptly delete such information
                and terminate the child's account.
              </p>
              <p>
                For users between 13 and 18, we provide additional privacy
                protections. Parents or guardians may contact us to review,
                update, or delete a minor's information.
              </p>
              <p>
                Educational institutions using SleuthInk for student accounts
                bear the responsibility of obtaining appropriate parental
                consent and ensuring compliance with COPPA and similar
                regulations.
              </p>
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
                Our Service may contain links to third-party websites and
                applications that are not operated by SleuthInk. This Privacy
                Policy does not apply to third-party services, and we are not
                responsible for their privacy practices. We encourage you to
                review the privacy policies of any third-party services before
                providing personal information.
              </p>
              <p>
                If you connect your SleuthInk account to third-party services
                (e.g., Google Drive, Microsoft OneDrive, Learning Management
                Systems), you are granting those services permission to access
                certain information. Please review their privacy policies and
                adjust your privacy settings accordingly.
              </p>
            </div>
          </section>

          {/* Section 11 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              11. California Privacy Rights (CCPA/CPRA)
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-4`}
            >
              <p>
                If you are a California resident, you have additional rights
                under the California Consumer Privacy Act (CCPA) and the
                California Privacy Rights Act (CPRA):
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Right to know what personal information is collected, used,
                  shared, or sold
                </li>
                <li>Right to delete personal information collected from you</li>
                <li>
                  Right to opt-out of the sale or sharing of personal
                  information
                </li>
                <li>Right to correct inaccurate personal information</li>
                <li>
                  Right to limit use and disclosure of sensitive personal
                  information
                </li>
              </ul>
              <p>
                We do not sell or share personal information as defined by
                CCPA/CPRA. To exercise your rights, contact
                privacy@sleuthink.com with "California Privacy Request" in the
                subject line.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
