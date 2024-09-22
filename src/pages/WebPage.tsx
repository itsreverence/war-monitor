import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useParams } from "react-router-dom";

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

export default function WebPage() {
  const { t } = useTranslation();
  const { category } = useParams<{ category: string }>();
  const [currentUrl, setCurrentUrl] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const options = webOptions[category as keyof typeof webOptions] || [];

  const handleOptionClick = (url: string) => {
    setCurrentUrl(url);
    setIsDrawerOpen(false);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between p-2 bg-background">
        <Button variant="outline" size="icon" onClick={() => setIsDrawerOpen(true)}>
          <MenuIcon className="h-4 w-4" />
        </Button>
        <h1 className="text-xl font-semibold">{t(`nav.web.${category}`)}</h1>
        <div className="w-8"></div> {/* This empty div balances the layout */}
      </div>
      <div className="flex-grow">
        {currentUrl ? (
          <webview
            src={currentUrl}
            style={{width: '100%', height: '100%'}}
          ></webview>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            {t('nav.web.selectOption')}
          </div>
        )}
      </div>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{t(`nav.web.${category}`)}</DrawerTitle>
            <DrawerDescription>{t(`nav.web.${category}Description`)}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            {options.map((option) => (
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
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}