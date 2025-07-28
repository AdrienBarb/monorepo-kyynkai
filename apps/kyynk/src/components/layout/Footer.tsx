import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations();
  return (
    <footer
      className="bg-black text-secondary px-4 py-8"
      data-id="homepage-footer"
    >
      <div className="w-full max-w-7xl flex flex-col gap-8 mx-auto">
        <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
          <p className="font-extralight">{t('footer.copyright')}</p>
          <div className="flex flex-col md:flex-row gap-4 text-center">
            <Link className="text-sm font-light" href="/terms-of-service">
              {t('termsOfServiceTitle')}
            </Link>
            <Link className="text-sm font-light" href="/privacy-policy">
              {t('privacyPolicyTitle')}
            </Link>
            <Link className="text-sm font-light" href="/dmca-policy">
              {t('dmcaPolicyTitle')}
            </Link>
            <Link className="text-sm font-light" href="/contact-us">
              {t('contactUsTitle')}
            </Link>
          </div>
        </div>
        <p className="text-sm text-center font-light max-w-2xl mx-auto">
          {t('footer.companyInfo')}{' '}
          <Link
            href="https://www.commercegate.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-sm font-light"
          >
            {t('footer.commerceGate')}
          </Link>{' '}
          {t('footer.paymentFacilitator')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
