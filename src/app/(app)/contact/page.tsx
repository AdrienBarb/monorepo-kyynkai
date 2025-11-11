import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/Separator';
import {
  Mail,
  Clock,
  Building,
  Shield,
  CreditCard,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';
import PaddingContainer from '@/components/layout/PaddingContainer';

export const metadata: Metadata = {
  title: 'Contact Us - Kyynk',
  description:
    'Get in touch with our customer support team. We&apos;re here to help with any questions about our services, account, or policies.',
};

export default function ContactPage() {
  return (
    <PaddingContainer>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Contact Us</h1>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-lg text-primary leading-relaxed">
              We&apos;re here to help you. If you have any questions about our
              services, your account, or our policies, please feel free to reach
              out to us.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Mail className="h-5 w-5" />
              Customer Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-blue-600" />
              <div className="text-primary">
                <span className="font-medium">Email:</span>{' '}
                <a
                  href="mailto:help@kyynk.com"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  help@kyynk.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-green-600" />
              <div className="text-primary">
                <span className="font-medium">Response Time:</span> We aim to
                reply within{' '}
                <Badge variant="secondary" className="font-semibold">
                  24–48 hours
                </Badge>{' '}
                on business days.
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Building className="h-5 w-5" />
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="font-semibold text-lg text-primary">
              Ally Corporation (SAS)
            </div>
            <div className="space-y-2 text-sm text-primary">
              <div>
                <span className="font-medium">RCS Paris:</span>{' '}
                <Badge variant="outline" className="text-primary">
                  949 248 058
                </Badge>
              </div>
              <div>
                <span className="font-medium">Registered office:</span> 60 rue
                François Ier, 75008 Paris, France
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Common Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="p-2 bg-blue-100 rounded-full">
                  <AlertTriangle className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-primary">
                    Account Support
                  </div>
                  <div className="text-sm text-primary">
                    Trouble signing in, password reset, or verification issues.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="p-2 bg-green-100 rounded-full">
                  <CreditCard className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-primary">
                    Payments & Credits
                  </div>
                  <div className="text-sm text-primary">
                    Questions about purchasing or using credits.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="p-2 bg-purple-100 rounded-full">
                  <FileText className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-primary">
                    Legal & Compliance
                  </div>
                  <div className="text-sm text-primary">
                    Inquiries about our Terms & Conditions or Privacy Policy.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="p-2 bg-red-100 rounded-full">
                  <Shield className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <div className="font-medium text-primary">
                    Safety & Reporting
                  </div>
                  <div className="text-sm text-primary">
                    Report abuse, harassment, or policy violations.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Additional Help</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-primary mb-4">For more details, please see:</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/terms"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FileText className="h-4 w-4" />
                Terms & Conditions
              </Link>
              <Link
                href="/privacy-policy"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Shield className="h-4 w-4" />
                Privacy Policy
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </PaddingContainer>
  );
}
