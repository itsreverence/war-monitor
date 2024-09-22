import * as React from "react"
import { GlobeIcon, SettingsIcon, LifeBuoyIcon } from "lucide-react"

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
  return (
    <NavigationMenu className="w-full justify-start">
      <NavigationMenuList className="space-x-4">
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
            <GlobeIcon className="mr-2 h-4 w-4" />
            Web
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <SettingsIcon className="mr-2 h-4 w-4" />
            Settings
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <SettingsContent />
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
            <LifeBuoyIcon className="mr-2 h-4 w-4" />
            Support
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}