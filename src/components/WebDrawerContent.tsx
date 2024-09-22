import React from 'react';
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

const webOptions = {
  search: [
    { name: 'Google', url: 'https://www.google.com' },
    { name: 'Bing', url: 'https://www.bing.com' },
  ],
  information: [
    { name: 'Wikipedia', url: 'https://www.wikipedia.org' },
    { name: 'Britannica', url: 'https://www.britannica.com' },
  ],
  verification: [
    { name: 'Snopes', url: 'https://www.snopes.com' },
    { name: 'FactCheck.org', url: 'https://www.factcheck.org' },
  ],
  translation: [
    { name: 'Google Translate', url: 'https://translate.google.com' },
    { name: 'DeepL', url: 'https://www.deepl.com/translator' },
  ],
};

interface WebDrawerContentProps {
  category: 'search' | 'information' | 'verification' | 'translation';
  onClose: () => void;
}

export function WebDrawerContent({ category, onClose }: WebDrawerContentProps) {
  const { t } = useTranslation();
  const [currentUrl, setCurrentUrl] = React.useState('');

  const handleOptionClick = (url: string) => {
    setCurrentUrl(url);
    // You might want to add logic here to navigate to the URL or open it in a new window
  };

  return (
    <>
      <DrawerHeader>
        <DrawerTitle>{t(`nav.web.${category}`)}</DrawerTitle>
        <DrawerDescription>{t(`nav.web.${category}Description`)}</DrawerDescription>
      </DrawerHeader>
      <div className="p-4 space-y-4">
        {webOptions[category].map((option) => (
          <Button
            key={option.name}
            variant="outline"
            className="w-full justify-start"
            onClick={() => handleOptionClick(option.url)}
          >
            {option.name}
          </Button>
        ))}
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DrawerClose>
      </DrawerFooter>
      {currentUrl && (
        <div className="p-4">
          <webview
            src={currentUrl}
            style={{width: '100%', height: '400px'}}
          ></webview>
        </div>
      )}
    </>
  );
}