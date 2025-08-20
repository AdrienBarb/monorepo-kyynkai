import { Metadata } from 'next';
import PaddingContainer from '@/components/layout/PaddingContainer';

export const metadata: Metadata = {
  title: 'Privacy Policy - Kyynk',
  description:
    'Privacy Policy for Kyynk AI Girlfriend platform - Learn how we collect, use, and protect your personal data.',
};

export default function PrivacyPolicyPage() {
  return (
    <PaddingContainer>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Effective Date:</strong> 12/08/2025
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Company:</strong> Ally Corporation (SAS)
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>RCS Paris:</strong> 949 248 058
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Registered office:</strong> 60 rue François Ier, 75008
              Paris, France
            </p>
            <p className="text-sm text-gray-600">
              <strong>Contact:</strong> help@kyynk.com
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-700 mb-4">
              This Privacy Policy explains how <strong>Ally Corporation</strong>{' '}
              (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;,
              &quot;us&quot;) collects, uses, and protects your personal data
              when you use our platform (&quot;Platform&quot;).
            </p>
            <p className="text-gray-700">
              We are committed to protecting your privacy and complying with the{' '}
              <strong>
                General Data Protection Regulation (EU) 2016/679 (GDPR)
              </strong>{' '}
              and French data protection laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Data We Collect
            </h2>
            <p className="text-gray-700 mb-4">
              We may collect and process the following types of personal data:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Account Information:</strong> email, username, password,
                age verification details.
              </li>
              <li>
                <strong>Payment Information:</strong> billing details,
                transaction records (processed by secure third-party payment
                providers, not stored by us).
              </li>
              <li>
                <strong>Usage Data:</strong> chat activity, credit usage,
                preferences, session logs.
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, browser type,
                device, operating system, cookies.
              </li>
              <li>
                <strong>Support Data:</strong> correspondence with our support
                team (help@kyynk.com).
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. How We Use Your Data
            </h2>
            <p className="text-gray-700 mb-4">
              We use your personal data for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                To provide and operate the Platform (chat, credits, media
                access).
              </li>
              <li>To process payments and manage credit balances.</li>
              <li>To verify user age and identity (18+ compliance).</li>
              <li>To ensure platform security and prevent fraud or abuse.</li>
              <li>
                To comply with legal obligations (e.g., financial reporting, law
                enforcement requests).
              </li>
              <li>To improve our services and user experience.</li>
              <li>To provide customer support and respond to inquiries.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Legal Basis for Processing
            </h2>
            <p className="text-gray-700 mb-4">
              We process your personal data under the following legal grounds:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Performance of Contract:</strong> to deliver services
                you purchase.
              </li>
              <li>
                <strong>Legal Obligation:</strong> to comply with financial,
                regulatory, and age-verification laws.
              </li>
              <li>
                <strong>Legitimate Interests:</strong> to ensure safety,
                security, and improvement of our services.
              </li>
              <li>
                <strong>Consent:</strong> for optional data (e.g., cookies,
                marketing).
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Sharing of Data
            </h2>
            <p className="text-gray-700 mb-4">
              We do not sell your personal data.
            </p>
            <p className="text-gray-700 mb-4">We may share data with:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Payment providers</strong> (e.g., Stripe, CommerceGate)
                to process transactions.
              </li>
              <li>
                <strong>Service providers</strong> (e.g., hosting, email
                delivery, analytics) under strict confidentiality agreements.
              </li>
              <li>
                <strong>Authorities</strong> where required by law or legal
                process.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. International Transfers
            </h2>
            <p className="text-gray-700 mb-4">
              Your data may be stored or processed outside the European Economic
              Area (EEA).
            </p>
            <p className="text-gray-700">
              In such cases, we ensure adequate safeguards (Standard Contractual
              Clauses or equivalent).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Data Retention
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Account data: retained as long as your account is active.</li>
              <li>
                Transaction records: kept for up to <strong>10 years</strong>{' '}
                (legal obligation).
              </li>
              <li>
                Support requests: kept for up to <strong>3 years</strong>.
              </li>
              <li>
                After account deletion, we delete or anonymize personal data
                except where retention is legally required.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Your Rights (GDPR)
            </h2>
            <p className="text-gray-700 mb-4">
              As a user, you have the following rights:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Access:</strong> obtain a copy of your personal data.
              </li>
              <li>
                <strong>Rectification:</strong> correct inaccurate or incomplete
                data.
              </li>
              <li>
                <strong>Erasure:</strong> request deletion of your data
                (&quot;right to be forgotten&quot;).
              </li>
              <li>
                <strong>Restriction:</strong> limit the processing of your data.
              </li>
              <li>
                <strong>Portability:</strong> receive your data in a structured,
                machine-readable format.
              </li>
              <li>
                <strong>Objection:</strong> object to processing based on
                legitimate interests.
              </li>
              <li>
                <strong>Withdraw consent:</strong> withdraw consent at any time
                (for optional processing).
              </li>
            </ul>
            <p className="text-gray-700 mt-4">
              You can exercise these rights by contacting us at{' '}
              <strong>help@kyynk.com</strong>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Security Measures
            </h2>
            <p className="text-gray-700 mb-4">
              We use industry-standard security measures, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Encrypted connections (SSL/TLS).</li>
              <li>Secure password hashing.</li>
              <li>Restricted access to sensitive data.</li>
              <li>Regular monitoring for security breaches.</li>
            </ul>
            <p className="text-gray-700">
              However, no system is 100% secure. Users are responsible for
              keeping login credentials confidential.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Cookies & Tracking
            </h2>
            <p className="text-gray-700 mb-4">
              The Platform uses cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Maintain sessions and login functionality.</li>
              <li>Track credit usage and service performance.</li>
              <li>Analyze usage patterns to improve services.</li>
            </ul>
            <p className="text-gray-700">
              Users may manage cookie preferences via browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              11. Age Restriction
            </h2>
            <p className="text-gray-700 mb-4">
              The Platform is strictly for users{' '}
              <strong>18 years and older</strong>.
            </p>
            <p className="text-gray-700">
              We may request age/identity verification before granting access.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              12. Changes to this Policy
            </h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time.
            </p>
            <p className="text-gray-700">
              We will notify users of significant changes via the Platform or
              email.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              13. Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have questions or requests regarding this Privacy Policy,
              please contact us at:
            </p>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2">
                📧{' '}
                <a
                  href="mailto:help@kyynk.com"
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  help@kyynk.com
                </a>
              </p>
              <p className="text-gray-700">
                📍 Ally Corporation, 60 rue François Ier, 75008 Paris, France
              </p>
            </div>
          </section>
        </div>
      </div>
    </PaddingContainer>
  );
}
