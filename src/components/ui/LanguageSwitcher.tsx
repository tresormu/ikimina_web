import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
        <Globe size={16} />
        <span>{languages.find(lang => lang.code === i18n.language)?.flag || '🌐'}</span>
        <span className="hidden sm:inline">
          {languages.find(lang => lang.code === i18n.language)?.name || 'Language'}
        </span>
      </button>
      
      <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${
              i18n.language === language.code ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <span>{language.name}</span>
            {i18n.language === language.code && (
              <span className="ml-auto text-primary-600">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
