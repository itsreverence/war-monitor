import * as React from "react";
import {
    GlobeIcon,
    SettingsIcon,
    LifeBuoyIcon,
    SearchIcon,
    InfoIcon,
    CheckCircleIcon,
    LanguagesIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function MainNavigationMenu() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const webOptions = [
        { key: "search", icon: <SearchIcon className="mr-2 h-4 w-4" /> },
        { key: "information", icon: <InfoIcon className="mr-2 h-4 w-4" /> },
        { key: "verification", icon: <CheckCircleIcon className="mr-2 h-4 w-4" /> },
        { key: "translation", icon: <LanguagesIcon className="mr-2 h-4 w-4" /> },
    ];

    return (
        <NavigationMenu className="w-full justify-start">
            <NavigationMenuList className="space-x-4">
                <NavigationMenuItem>
                    <NavigationMenuTrigger>{t("nav.web.title")}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {webOptions.map((option) => (
                                <ListItem
                                    key={option.key}
                                    title={t(`nav.web.${option.key}`)}
                                    icon={option.icon}
                                    onClick={() => navigate(`/web/${option.key}`)}
                                >
                                    {t(`nav.web.${option.key}Description`)}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        onClick={() => navigate("/settings")}
                    >
                        <SettingsIcon className="mr-2 h-4 w-4" />
                        {t("nav.settings.title")}
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        onClick={() => navigate("/support")}
                    >
                        <LifeBuoyIcon className="mr-2 h-4 w-4" />
                        {t("nav.support")}
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
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
    );
});
ListItem.displayName = "ListItem";
