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

export default function CookiePolicy() {
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
            TRANSPARENCY MATTERS
          </h2>
          <h1
            className={`${rw.className} text-4xl md:text-5xl lg:text-7xl tracking-tighter text-white mb-4`}
          >
            Cookie{" "}
            <span className="bg-gradient-to-r from-purple-300 via-purple-500 to-purple-300 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          <p
            className={`${dmSans_lighter.className} text-gray-400 text-xl md:text-2xl mt-8 max-w-3xl mx-auto`}
          >
            Learn how SleuthInk uses cookies and similar technologies to enhance
            your experience while respecting your privacy.
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
              1. What Are Cookies?
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-4`}
            >
              <p>
                Cookies are small text files that are stored on your device
                (computer, tablet, smartphone, or other device) when you visit a
                website or use an application. These files contain information
                about your visit, preferences, and interactions with the website
                or application.
              </p>
              <p>
                Cookies serve as a mechanism for websites and applications to
                remember information about your visits, including your login
                status, preferences, and behavioral patterns. They enable
                personalization, security, and functional enhancements to
                improve your user experience.
              </p>
              <p>
                When you visit SleuthInk, we may set one or more cookies on your
                device. Each time you return to our website or use our
                application, your browser sends these cookies back to our
                servers, allowing us to recognize you and remember your
                preferences.
              </p>
              <p>
                It&apos;s important to note that cookies themselves cannot harm
                your device or access files on your computer. However, some
                cookies may track your online behavior across different websites
                if you allow it. SleuthInk uses cookies responsibly and in
                compliance with applicable privacy laws.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              2. Types of Cookies We Use
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-6`}
            >
              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  A. Essential Cookies (Strictly Necessary)
                </h3>
                <p className="mb-4">
                  These cookies are absolutely necessary for the basic
                  functionality of SleuthInk. Without these cookies, the website
                  and application cannot function properly. They are not blocked
                  by browser privacy settings as they are critical to service
                  delivery.
                </p>
                <div className="bg-gray-900/50 p-4  border border-purple-500/20 space-y-3">
                  <p>
                    <strong className="text-purple-300">Purpose:</strong> Enable
                    core functionality such as login authentication, session
                    management, and security features
                  </p>
                  <p>
                    <strong className="text-purple-300">Duration:</strong>{" "}
                    Session-based (deleted when you close your browser) or up to
                    12 months for persistent cookies
                  </p>
                  <p>
                    <strong className="text-purple-300">Examples:</strong>{" "}
                    Authentication tokens, CSRF protection tokens, session
                    identifiers
                  </p>
                  <p>
                    <strong className="text-purple-300">User Control:</strong>{" "}
                    Cannot be disabled without breaking core functionality
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  B. Functional Cookies (Performance)
                </h3>
                <p className="mb-4">
                  Functional cookies enhance your experience by remembering your
                  choices and customizations. They enable personalization and
                  improved usability without tracking your behavior across other
                  websites.
                </p>
                <div className="bg-gray-900/50 p-4  border border-purple-500/20 space-y-3">
                  <p>
                    <strong className="text-purple-300">Purpose:</strong>{" "}
                    Remember user preferences (language, theme, interface
                    settings), maintain user preferences across sessions
                  </p>
                  <p>
                    <strong className="text-purple-300">Duration:</strong>{" "}
                    Typically 6-12 months
                  </p>
                  <p>
                    <strong className="text-purple-300">Examples:</strong> Theme
                    preference (dark/light mode), language selection, saved
                    dashboard layouts
                  </p>
                  <p>
                    <strong className="text-purple-300">User Control:</strong>{" "}
                    Can be disabled through cookie settings, though this may
                    reduce functionality
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  C. Analytics Cookies (Performance & Improvement)
                </h3>
                <p className="mb-4">
                  These cookies collect information about how you use SleuthInk,
                  including which pages you visit, how long you stay on pages,
                  and which features you use. This aggregated data helps us
                  understand usage patterns and improve our Service.
                </p>
                <div className="bg-gray-900/50 p-4  border border-purple-500/20 space-y-3">
                  <p>
                    <strong className="text-purple-300">Purpose:</strong> Track
                    page views, feature usage, user flow, bounce rates, and
                    engagement metrics
                  </p>
                  <p>
                    <strong className="text-purple-300">Duration:</strong>{" "}
                    Typically 12-24 months
                  </p>
                  <p>
                    <strong className="text-purple-300">Tools:</strong> Google
                    Analytics, Amplitude, Mixpanel, and similar analytics
                    services
                  </p>
                  <p>
                    <strong className="text-purple-300">
                      Data Anonymization:
                    </strong>{" "}
                    Analytics data is aggregated and anonymized to prevent
                    identification of individual users
                  </p>
                  <p>
                    <strong className="text-purple-300">User Control:</strong>{" "}
                    Can be disabled through cookie settings or opt-out
                    mechanisms
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  D. Security Cookies
                </h3>
                <p className="mb-4">
                  Security cookies protect your account and detect suspicious
                  activity. They are essential for preventing fraud,
                  unauthorized access, and malicious attacks.
                </p>
                <div className="bg-gray-900/50 p-4  border border-purple-500/20 space-y-3">
                  <p>
                    <strong className="text-purple-300">Purpose:</strong>{" "}
                    Prevent fraud, detect unusual login patterns, protect
                    against CSRF attacks, track security events
                  </p>
                  <p>
                    <strong className="text-purple-300">Duration:</strong>{" "}
                    Session-based or up to 12 months
                  </p>
                  <p>
                    <strong className="text-purple-300">Examples:</strong> IP
                    address cookies, anomaly detection tokens, geo-location
                    verification cookies
                  </p>
                  <p>
                    <strong className="text-purple-300">User Control:</strong>{" "}
                    Cannot be disabled without compromising account security
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  E. Marketing & Advertising Cookies
                </h3>
                <p className="mb-4">
                  These cookies may be set by SleuthInk or third-party
                  advertising partners to track your interactions and deliver
                  targeted content. We do not sell your data to advertisers but
                  may use cookies for legitimate marketing purposes.
                </p>
                <div className="bg-gray-900/50 p-4  border border-purple-500/20 space-y-3">
                  <p>
                    <strong className="text-purple-300">Purpose:</strong>{" "}
                    Deliver relevant promotional content, measure marketing
                    campaign effectiveness, retargeting on other websites
                  </p>
                  <p>
                    <strong className="text-purple-300">Duration:</strong> 1-24
                    months
                  </p>
                  <p>
                    <strong className="text-purple-300">
                      Third-Party Services:
                    </strong>{" "}
                    Google Ads, Facebook Pixel, LinkedIn Insight Tag
                  </p>
                  <p>
                    <strong className="text-purple-300">User Control:</strong>{" "}
                    Can be disabled through cookie settings; opt-out preferences
                    should be respected
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  F. Session Cookies vs. Persistent Cookies
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-900/50 p-4  border border-purple-500/20">
                    <p>
                      <strong className="text-purple-300">
                        Session Cookies:
                      </strong>{" "}
                      These temporary cookies are deleted when you close your
                      browser or logout. They maintain authentication and
                      security during your active session.
                    </p>
                  </div>
                  <div className="bg-gray-900/50 p-4  border border-purple-500/20">
                    <p>
                      <strong className="text-purple-300">
                        Persistent Cookies:
                      </strong>{" "}
                      These cookies remain on your device for a specified
                      duration (days, months, or years). They enable recognition
                      across multiple sessions and store your long-term
                      preferences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              3. Similar Technologies
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-6`}
            >
              <p>
                In addition to cookies, SleuthInk may use similar technologies
                to collect information about your device and online behavior:
              </p>

              <div className="space-y-4">
                <div className="bg-gray-900/50 p-4  border border-purple-500/20">
                  <h4 className="text-purple-300 font-bold mb-2">
                    Web Beacons (Tracking Pixels)
                  </h4>
                  <p>
                    Small, transparent images embedded in web pages and emails
                    that track when content is viewed. They help us measure
                    campaign effectiveness and user engagement.
                  </p>
                </div>

                <div className="bg-gray-900/50 p-4  border border-purple-500/20">
                  <h4 className="text-purple-300 font-bold mb-2">
                    Local Storage & Session Storage
                  </h4>
                  <p>
                    Browser storage mechanisms that store more data than
                    cookies. Used for application state, offline functionality,
                    and caching to improve performance.
                  </p>
                </div>

                <div className="bg-gray-900/50 p-4  border border-purple-500/20">
                  <h4 className="text-purple-300 font-bold mb-2">
                    Browser Fingerprinting
                  </h4>
                  <p>
                    Techniques to create a unique identifier for your browser
                    based on device characteristics. Used for security and fraud
                    prevention, not for tracking across websites.
                  </p>
                </div>

                <div className="bg-gray-900/50 p-4  border border-purple-500/20">
                  <h4 className="text-purple-300 font-bold mb-2">
                    Mobile App Identifiers
                  </h4>
                  <p>
                    Unique identifiers for mobile devices to track app usage,
                    perform analytics, and deliver personalized content within
                    the SleuthInk mobile application.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              4. Managing Your Cookies
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-6`}
            >
              <p>
                You have significant control over cookies and similar
                technologies. Most browsers allow you to manage cookie settings
                through your browser preferences.
              </p>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  A. Browser Cookie Controls
                </h3>
                <p className="mb-4">To manage cookies through your browser:</p>
                <ul className="list-disc list-inside space-y-3 ml-4">
                  <li>
                    <strong>Chrome:</strong> Settings → Privacy and Security →
                    Cookies and other site data
                  </li>
                  <li>
                    <strong>Firefox:</strong> Preferences → Privacy & Security →
                    Cookies and Site Data
                  </li>
                  <li>
                    <strong>Safari:</strong> Preferences → Privacy → Cookies and
                    website data
                  </li>
                  <li>
                    <strong>Edge:</strong> Settings → Privacy, search, and
                    services → Clear browsing data
                  </li>
                  <li>
                    <strong>Mobile Browsers:</strong> Settings → Apps → Browser
                    → Clear cookies/cache
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  B. Cookie Options
                </h3>
                <p className="mb-4">You can:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Accept all cookies</li>
                  <li>Block all cookies</li>
                  <li>Delete existing cookies</li>
                  <li>Allow only essential cookies</li>
                  <li>Customize which categories of cookies to allow</li>
                  <li>
                    Receive notifications when a site attempts to set a cookie
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  C. SleuthInk Cookie Preferences
                </h3>
                <p className="mb-4">
                  When you first visit SleuthInk, we present a cookie consent
                  banner allowing you to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Accept all cookies</li>
                  <li>Reject all non-essential cookies</li>
                  <li>Customize your cookie preferences</li>
                  <li>Access this Cookie Policy for more information</li>
                </ul>
                <p className="mt-4">
                  You can update your cookie preferences at any time through
                  your account settings or by clicking the cookie preferences
                  button on our website.
                </p>
              </div>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  D. Important Notes
                </h3>
                <div className="bg-gradient-to-r from-purple-900/20 to-transparent p-4  border border-purple-500/30">
                  <p className="mb-3">
                    <strong className="text-purple-300">
                      Essential Cookies:
                    </strong>{" "}
                    Disabling essential cookies may impair core functionality
                    and prevent you from using certain features. You cannot
                    opt-out of these cookies without breaking the Service.
                  </p>
                  <p>
                    <strong className="text-purple-300">
                      Cookie Persistence:
                    </strong>{" "}
                    Your cookie preferences are stored in a cookie. If you
                    delete all cookies or use private browsing mode, you may
                    need to reselect your preferences.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-purple-300 text-2xl font-bold mb-4">
                  E. Do Not Track (DNT)
                </h3>
                <p>
                  Some browsers include a "Do Not Track" feature. Currently,
                  there is no universal standard for responding to DNT signals.
                  While SleuthInk respects your privacy preferences, we cannot
                  guarantee compliance with DNT signals across all scenarios. We
                  recommend using your browser's cookie and privacy settings for
                  more reliable control.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              5. Third-Party Cookies
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-6`}
            >
              <p>
                In addition to cookies we set directly, third-party service
                providers may set their own cookies when you use SleuthInk.
                These include:
              </p>

              <div className="space-y-4">
                <div className="bg-gray-900/50 p-4  border border-purple-500/20">
                  <h4 className="text-purple-300 font-bold mb-2">
                    Analytics Providers
                  </h4>
                  <p>
                    Google Analytics, Amplitude, and similar services set
                    cookies to track user behavior and provide performance
                    insights. These services have their own privacy policies
                    governing cookie use.
                  </p>
                </div>

                <div className="bg-gray-900/50 p-4  border border-purple-500/20">
                  <h4 className="text-purple-300 font-bold mb-2">
                    Payment Processors
                  </h4>
                  <p>
                    Stripe, PayPal, and other payment services set cookies to
                    facilitate secure transactions and prevent fraud.
                  </p>
                </div>

                <div className="bg-gray-900/50 p-4  border border-purple-500/20">
                  <h4 className="text-purple-300 font-bold mb-2">
                    Content Delivery Networks (CDNs)
                  </h4>
                  <p>
                    Cloudflare and similar CDNs set cookies to optimize content
                    delivery and monitor website performance.
                  </p>
                </div>

                <div className="bg-gray-900/50 p-4  border border-purple-500/20">
                  <h4 className="text-purple-300 font-bold mb-2">
                    Advertising Networks
                  </h4>
                  <p>
                    Google Ads, Facebook, LinkedIn, and other platforms may set
                    cookies for retargeting and campaign measurement.
                  </p>
                </div>

                <div className="bg-gray-900/50 p-4  border border-purple-500/20">
                  <h4 className="text-purple-300 font-bold mb-2">
                    Customer Support Services
                  </h4>
                  <p>
                    Help desk and chat support platforms set cookies to maintain
                    session information and provide seamless support.
                  </p>
                </div>
              </div>

              <p className="mt-6">
                We recommend reviewing the privacy policies of these third-party
                services to understand their cookie practices and exercise your
                rights with them independently.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              6. Data Security & Cookie Safety
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-4`}
            >
              <p>
                While cookies themselves cannot transmit viruses or access files
                on your device, we take security measures to protect cookie
                data:
              </p>
              <ul className="list-disc list-inside space-y-3 ml-4">
                <li>
                  <strong>Secure Transmission:</strong> Authentication and
                  security cookies are transmitted only over HTTPS encrypted
                  connections
                </li>
                <li>
                  <strong>HttpOnly Flag:</strong> Many cookies have the HttpOnly
                  flag set, preventing access by JavaScript and reducing XSS
                  vulnerability
                </li>
                <li>
                  <strong>Secure Flag:</strong> Cookies are marked as "Secure"
                  to ensure transmission only over encrypted HTTPS connections
                </li>
                <li>
                  <strong>SameSite Attribute:</strong> Cookies include SameSite
                  attributes to prevent CSRF attacks and unauthorized use
                </li>
                <li>
                  <strong>Encrypted Values:</strong> Sensitive cookie values are
                  encrypted to prevent unauthorized access if cookie files are
                  compromised
                </li>
              </ul>
            </div>
          </section>

          {/* Section 7 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              7. Specific Cookie Examples
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-4`}
            >
              <p>
                The following is a non-exhaustive list of cookies we may set:
              </p>
              <div className="overflow-x-auto mt-6">
                <table className="w-full text-sm border border-purple-500/30">
                  <thead>
                    <tr className="bg-purple-900/20">
                      <th className="border border-purple-500/20 p-3 text-left text-purple-300">
                        Cookie Name
                      </th>
                      <th className="border border-purple-500/20 p-3 text-left text-purple-300">
                        Purpose
                      </th>
                      <th className="border border-purple-500/20 p-3 text-left text-purple-300">
                        Duration
                      </th>
                      <th className="border border-purple-500/20 p-3 text-left text-purple-300">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-purple-500/20 p-3">
                        session_id
                      </td>
                      <td className="border border-purple-500/20 p-3">
                        Authentication and session management
                      </td>
                      <td className="border border-purple-500/20 p-3">
                        Session
                      </td>
                      <td className="border border-purple-500/20 p-3">
                        Essential
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-purple-500/20 p-3">
                        csrf_token
                      </td>
                      <td className="border border-purple-500/20 p-3">
                        CSRF protection
                      </td>
                      <td className="border border-purple-500/20 p-3">
                        Session
                      </td>
                      <td className="border border-purple-500/20 p-3">
                        Security
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-purple-500/20 p-3">
                        theme_preference
                      </td>
                      <td className="border border-purple-500/20 p-3">
                        Remember light/dark mode preference
                      </td>
                      <td className="border border-purple-500/20 p-3">
                        12 months
                      </td>
                      <td className="border border-purple-500/20 p-3">
                        Functional
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-purple-500/20 p-3">
                        language
                      </td>
                      <td className="border border-purple-500/20 p-3">
                        Store language preference
                      </td>
                      <td className="border border-purple-500/20 p-3">
                        12 months
                      </td>
                      <td className="border border-purple-500/20 p-3">
                        Functional
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-purple-500/20 p-3">
                        _ga, _gid
                      </td>
                      <td className="border border-purple-500/20 p-3">
                        Google Analytics tracking
                      </td>
                      <td className="border border-purple-500/20 p-3">
                        2 years
                      </td>
                      <td className="border border-purple-500/20 p-3">
                        Analytics
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-purple-500/20 p-3">
                        cookie_consent
                      </td>
                      <td className="border border-purple-500/20 p-3">
                        Store cookie preference choices
                      </td>
                      <td className="border border-purple-500/20 p-3">
                        12 months
                      </td>
                      <td className="border border-purple-500/20 p-3">
                        Essential
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 8 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              8. International Compliance
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-6`}
            >
              <p>
                SleuthInk complies with international cookie and privacy
                regulations:
              </p>

              <div className="space-y-4">
                <div className="bg-gray-900/50 p-4  border border-purple-500/20">
                  <h4 className="text-purple-300 font-bold mb-2">
                    GDPR (General Data Protection Regulation)
                  </h4>
                  <p>
                    For users in the EU, we obtain explicit consent before
                    setting non-essential cookies and provide granular cookie
                    controls.
                  </p>
                </div>

                <div className="bg-gray-900/50 p-4  border border-purple-500/20">
                  <h4 className="text-purple-300 font-bold mb-2">
                    CCPA/CPRA (California Consumer Privacy Act)
                  </h4>
                  <p>
                    California residents can request information about cookies
                    and opt-out of certain tracking technologies.
                  </p>
                </div>

                <div className="bg-gray-900/50 p-4  border border-purple-500/20">
                  <h4 className="text-purple-300 font-bold mb-2">
                    ePrivacy Directive
                  </h4>
                  <p>
                    We comply with ePrivacy requirements in the UK and other
                    jurisdictions requiring consent for cookies.
                  </p>
                </div>

                <div className="bg-gray-900/50 p-4  border border-purple-500/20">
                  <h4 className="text-purple-300 font-bold mb-2">
                    PIPEDA (Canada)
                  </h4>
                  <p>
                    Canadian users have rights regarding cookies and tracking,
                    which we respect and facilitate.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 9 */}
          <section className="border-l-4 border-purple-500 pl-8">
            <h2
              className={`${dmSans_light.className} text-4xl md:text-5xl tracking-tight text-white mb-6`}
            >
              9. Policy Updates
            </h2>
            <div
              className={`${dmSans_lighter.className} text-gray-300 text-lg leading-relaxed space-y-4`}
            >
              <p>
                We may update this Cookie Policy periodically to reflect changes
                in our practices, new technologies, or regulatory requirements.
                Significant changes will be communicated via email or prominent
                notice on our website.
              </p>
              <p>
                Your continued use of SleuthInk after updates constitutes
                acceptance of the revised Cookie Policy. We encourage you to
                review this policy regularly to stay informed about how we use
                cookies.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
