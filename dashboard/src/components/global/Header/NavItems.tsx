import React from "react";
import { NavLinks } from "@constants/NavLinks";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { cn } from "@lib/utils";
type Props = {
  className: string;
};

const NavItems = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement> & Props) => {
  return (
    <nav className={cn("flex items-center", className)} {...props}>
      {NavLinks.map((nav) => (
        <NavigationMenu key={nav.label}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to={nav.to}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {nav.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      ))}
    </nav>
  );
};

export default NavItems;
