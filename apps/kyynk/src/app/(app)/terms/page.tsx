import { Metadata } from 'next';
import PaddingContainer from '@/components/layout/PaddingContainer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Kyynk',
  description: 'Terms and conditions for using the Kyynk platform',
};

export default function TermsPage() {
  return (
    <PaddingContainer>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-2xl font-bold">Terms & Conditions</h1>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="prose prose-lg max-w-none">
            <div className="text-sm text-muted-foreground mb-6">
              <strong>Effective Date:</strong> 12/08/2025
            </div>

            <p className="text-lg mb-6">
              These Terms and Conditions (&quot;Terms&quot;) govern the use of
              the services provided by <strong>Ally Corporation</strong>, a
              Société par Actions Simplifiée (SAS) registered with the Paris
              Trade and Companies Register under number
              <strong> 949 248 058</strong>, with its registered office at{' '}
              <strong>60 rue François Ier, 75008 Paris, France</strong>
              (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;,
              &quot;us&quot;).
            </p>

            <p className="text-lg mb-8">
              By accessing or using our platform (&quot;Platform&quot;), you
              (&quot;User&quot;, &quot;you&quot;) agree to be bound by these
              Terms. If you do not agree, you must not use the Platform.
            </p>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold mt-8 mb-4">
              1. Services Provided
            </h2>
            <p className="mb-6">
              The Platform provides users with access to interactive digital
              content, including AI-based chat companions, images, and videos.
              Access to these services requires the purchase and use of{' '}
              <strong>credits</strong>.
            </p>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold mt-8 mb-4">
              2. Credit System & Pricing
            </h2>
            <ul className="mb-4">
              <li>
                Users may purchase credits in predefined <strong>packs</strong>:
              </li>
            </ul>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Package
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Price (EUR)
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Credits
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Bonus Credits
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Starter
                    </td>
                    <td className="border border-gray-300 px-4 py-2">€9.99</td>
                    <td className="border border-gray-300 px-4 py-2">100</td>
                    <td className="border border-gray-300 px-4 py-2">0</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      Popular
                    </td>
                    <td className="border border-gray-300 px-4 py-2">€19.99</td>
                    <td className="border border-gray-300 px-4 py-2">250</td>
                    <td className="border border-gray-300 px-4 py-2">50</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Premium
                    </td>
                    <td className="border border-gray-300 px-4 py-2">€39.99</td>
                    <td className="border border-gray-300 px-4 py-2">600</td>
                    <td className="border border-gray-300 px-4 py-2">150</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">VIP</td>
                    <td className="border border-gray-300 px-4 py-2">€79.99</td>
                    <td className="border border-gray-300 px-4 py-2">1400</td>
                    <td className="border border-gray-300 px-4 py-2">400</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Ultimate
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      €149.99
                    </td>
                    <td className="border border-gray-300 px-4 py-2">3200</td>
                    <td className="border border-gray-300 px-4 py-2">1200</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="mb-6 space-y-2">
              <li>
                • All prices include applicable taxes, unless stated otherwise.
              </li>
              <li>
                • Credits are consumed when sending messages, unlocking media,
                or using premium features.
              </li>
              <li>
                • Credits have <strong>no monetary value</strong>, are{' '}
                <strong>non-transferable</strong>, and{' '}
                <strong>cannot be exchanged for cash</strong>.
              </li>
            </ul>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold mt-8 mb-4">
              3. Refund & Return Policy
            </h2>
            <ul className="mb-6 space-y-2">
              <li>
                • <strong>All sales of credits are final.</strong>
              </li>
              <li>
                • <strong>Strict No-Refund Policy</strong> applies: once credits
                are purchased, they cannot be refunded, exchanged, or reversed,
                whether used or unused.
              </li>
              <li>
                • By purchasing credits, you expressly waive your right of
                withdrawal under EU consumer protection law, in accordance with
                Article L221-28 of the French Consumer Code (digital content
                exception).
              </li>
            </ul>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold mt-8 mb-4">
              4. Eligibility & Age Restriction
            </h2>
            <ul className="mb-6 space-y-2">
              <li>
                • The Platform is strictly limited to users{' '}
                <strong>18 years of age or older</strong>.
              </li>
              <li>
                • By creating an account, you confirm you are at least 18 years
                old.
              </li>
              <li>
                • We reserve the right to request age verification documents at
                any time and to suspend or terminate accounts failing to comply.
              </li>
            </ul>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold mt-8 mb-4">
              5. User Obligations & Prohibited Conduct
            </h2>
            <p className="mb-4">Users must:</p>
            <ul className="mb-4 space-y-2">
              <li>• Use the Platform only for lawful purposes.</li>
              <li>• Respect other users, our staff, and our AI companions.</li>
            </ul>

            <p className="mb-4">Users must not:</p>
            <ul className="mb-6 space-y-2">
              <li>
                • Engage in harassment, hate speech, abuse, or any harmful
                behavior.
              </li>
              <li>
                • Upload, share, or attempt to generate illegal, non-consensual,
                or harmful content (including but not limited to child sexual
                abuse material, non-consensual sexual content, incitement to
                violence, or illegal pornography).
              </li>
              <li>• Attempt to hack, disrupt, or misuse the Platform.</li>
            </ul>

            <p className="mb-6">
              Violation of these rules may result in{' '}
              <strong>account suspension or permanent ban</strong> without
              refund.
            </p>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold mt-8 mb-4">
              6. Consent & Compliance
            </h2>
            <ul className="mb-6 space-y-2">
              <li>
                • All interactions on the Platform are based on{' '}
                <strong>consent and fictional adult roleplay</strong>.
              </li>
              <li>
                • The Platform strictly prohibits any content or activity that
                violates <strong>applicable laws</strong>, including laws
                relating to consent, obscenity, and intellectual property.
              </li>
              <li>
                • Users remain solely responsible for their actions and
                interactions within the Platform.
              </li>
            </ul>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold mt-8 mb-4">
              7. Privacy & Data Protection
            </h2>
            <p className="mb-4">
              We are committed to protecting your personal data in compliance
              with the{' '}
              <strong>General Data Protection Regulation (GDPR)</strong>.
            </p>
            <ul className="mb-6 space-y-2">
              <li>
                • Personal data is collected, stored, and processed as described
                in our separate{' '}
                <Link href="/privacy-policy">
                  <strong>Privacy Policy</strong>
                </Link>
                .
              </li>
              <li>
                • By using the Platform, you acknowledge and accept the terms of
                our Privacy Policy.
              </li>
            </ul>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold mt-8 mb-4">
              8. Intellectual Property
            </h2>
            <ul className="mb-6 space-y-2">
              <li>
                • All Platform content (including AI models, software, branding,
                images, and media) is the exclusive property of Ally Corporation
                or its licensors.
              </li>
              <li>
                • Users may not reproduce, distribute, or exploit any part of
                the Platform without prior written consent.
              </li>
            </ul>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold mt-8 mb-4">
              9. Limitation of Liability
            </h2>
            <ul className="mb-6 space-y-2">
              <li>• The Platform is provided on an &quot;as is&quot; basis.</li>
              <li>
                • Ally Corporation is not liable for damages resulting from user
                misuse, technical failures, or third-party actions.
              </li>
              <li>
                • To the maximum extent permitted by law, our liability is
                limited to the amount paid by the user for credits in the last 6
                months.
              </li>
            </ul>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold mt-8 mb-4">
              10. Governing Law & Jurisdiction
            </h2>
            <p className="mb-4">
              These Terms are governed by <strong>French law</strong>.
            </p>
            <p className="mb-6">
              Any dispute shall be submitted to the{' '}
              <strong>
                exclusive jurisdiction of the courts of Paris, France
              </strong>
              .
            </p>

            <hr className="my-8" />

            <h2 className="text-2xl font-bold mt-8 mb-4">11. Contact</h2>
            <p className="mb-4">
              For any questions or support requests, please contact:
            </p>
            <p className="mb-6">
              📧{' '}
              <a
                href="mailto:help@kyynk.com"
                className="text-blue-600 hover:underline"
              >
                <strong>help@kyynk.com</strong>
              </a>
            </p>
          </div>
        </div>
      </div>
    </PaddingContainer>
  );
}
