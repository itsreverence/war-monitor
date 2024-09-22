import * as React from "react"
import { GlobeIcon, SettingsIcon, LifeBuoyIcon, SearchIcon, InfoIcon, CheckCircleIcon, LanguagesIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function MainNavigationMenu() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <NavigationMenu className="w-full justify-start">
      <NavigationMenuList className="space-x-4">
        <NavigationMenuItem>
          <NavigationMenuLink 
            className={navigationMenuTriggerStyle()} 
            onClick={() => navigate("/web")}
          >
            <GlobeIcon className="mr-2 h-4 w-4" />
            {t('nav.web.title')}
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink 
            className={navigationMenuTriggerStyle()} 
            onClick={() => navigate("/settings")}
          >
            <SettingsIcon className="mr-2 h-4 w-4" />
            {t('nav.settings.title')}
          </NavigationMenuLink>
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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: React.ReactNode }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center text-sm font-medium leading-none">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"