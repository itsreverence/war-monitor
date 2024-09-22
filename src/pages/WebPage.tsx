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

export default function WebPage() {
  const { t } = useTranslation();
  const [currentUrl, setCurrentUrl] = useState('');

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center p-2 bg-background">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon className="h-4 w-4" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{t('nav.web.title')}</DrawerTitle>
              <DrawerDescription>{t('nav.web.description')}</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-4">
              {Object.entries(webOptions).map(([category, options]) => (
                <div key={category}>
                  <h3 className="mb-2 text-lg font-semibold">{t(`nav.web.${category}`)}</h3>
                  <div className="space-y-2">
                    {options.map((option) => (
                      <Button
                        key={option.name}
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => {
                          setCurrentUrl(option.url);
                          document.querySelector<HTMLButtonElement>('.drawer-close')?.click();
                        }}
                      >
                        {option.name}
                      </Button>
                    ))}
                  </div>
                </div>
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
    </div>
  );
}