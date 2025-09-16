'use client';

import { FC, useEffect } from 'react';
import { useLocale } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';

interface Language {
  code: string;
  label: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
];

const LanguageSwitcher: FC = () => {
  const [lang, setLang] = useQueryState('lang');
  const nextLocale = useLocale();
  const currentLocale = lang || nextLocale;
  const router = useRouter();

  const handleLanguageChange = (languageCode: string) => {
    document.cookie = `NEXT_LOCALE=${languageCode}; path=/; max-age=${
      60 * 60 * 24 * 365
    }; SameSite=Lax`;

    router.refresh();
  };

  useEffect(() => {
    if (lang && languages.some((l) => l.code === lang)) {
      handleLanguageChange(lang);
      setLang(null);
    }
  }, [lang]);

  const currentLanguage =
    languages.find((lang) => lang.code === currentLocale) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-primary hover:text-background hover:bg-primary"
        >
          <span className="hidden sm:inline">
            {currentLanguage.flag} {currentLanguage.label}
          </span>
          <span className="sm:hidden">{currentLanguage.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center gap-2 cursor-pointer ${
              currentLocale === language.code
                ? 'bg-secondary text-background font-medium'
                : ''
            }`}
          >
            <span>{language.flag}</span>
            <span>{language.label}</span>
            {currentLocale === language.code && (
              <span className="ml-auto text-xs">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
