import * as React from "react"
import { GlobeIcon, SettingsIcon, LifeBuoyIcon, MessageSquarePlusIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import SettingsContent from "./SettingsContent"

export function MainNavigationMenu() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <NavigationMenu className="w-full justify-start">
      <NavigationMenuList className="space-x-4">
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
            <GlobeIcon className="mr-2 h-4 w-4" />
            {t('nav.web')}
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <SettingsIcon className="mr-2 h-4 w-4" />
            {t('nav.settings')}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <SettingsContent />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink 
            className={navigationMenuTriggerStyle()} 
            onClick={() => navigate("/support")}
          >
            <LifeBuoyIcon className="mr-2 h-4 w-4" />
            {t('nav.support')}
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}