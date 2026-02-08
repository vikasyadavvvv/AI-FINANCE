import { useState } from "react";
import { Menu } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { PROTECTED_ROUTES } from "@/routes/common/routePath";
import { cn } from "@/lib/utils";
import Logo from "../logo/logo";
import { Button } from "../ui/button";
import { Sheet, SheetContent } from "../ui/sheet";
import { UserNav } from "./user-nav";
import LogoutDialog from "./logout-dialog";
import { useTypedSelector } from "@/app/hook";

const Navbar = () => {
  const { pathname } = useLocation();
  const { user } = useTypedSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const routes = [
    {
      href: PROTECTED_ROUTES.OVERVIEW,
      label: "Overview",
    },
    {
      href: PROTECTED_ROUTES.TRANSACTIONS,
      label: "Transactions",
    },
    {
      href: PROTECTED_ROUTES.REPORTS,
      label: "Reports",
    },
    {
      href: PROTECTED_ROUTES.SETTINGS,
      label: "Settings",
    },
  ];

  return (
    <>
      <header
        className={cn(
          "w-full px-4 py-3 pb-3 lg:px-14 text-primary-foreground border-b border-border/60 bg-gradient-to-r from-[#edf2ff] via-[#f7f9ff] to-[#eef6f0] dark:from-[#111b3b] dark:via-[#0c142b] dark:to-[#122146] shadow-sm",
          pathname === PROTECTED_ROUTES.OVERVIEW && "!pb-3"
        )}
      >
        <div className="w-full flex h-14 max-w-[var(--max-width)] items-center mx-auto">
          <div className="w-full flex items-center justify-between">
            {/* Left side - Logo */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="inline-flex md:hidden !cursor-pointer rounded-lg
               !bg-primary !text-white hover:bg-primary/90 shadow-sm"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <div className="mb-8">
                <Logo />


              </div>
            </div>

            {/* Navigation*/}
            <nav className="hidden md:flex items-center gap-x-2 overflow-x-auto rounded-full bg-white/70 px-2 py-1 shadow-sm border border-border/60 dark:bg-white/5">
              {routes?.map((route) => (
                <Button
                  key={route.href}
                  size="sm"
                  variant="ghost"
                  className={cn(
                    `
        w-full lg:w-auto font-medium py-2.5 px-4
        border-none bg-[#eaf1ff]
        text-[#12306c]
        hover:bg-[#dce7ff]
        hover:text-[#1b3f9a]
        transition text-[14.5px] rounded-full shadow-xs
        dark:bg-[#1a244a]
        dark:text-[#e9eeff]
        dark:hover:bg-[#25305a]
        `,
                    pathname === route.href &&
                      "bg-[#2b4cc9] text-white font-semibold hover:text-white dark:bg-[#3a5ef0]"
                  )}
                  asChild
                >
                  <NavLink to={route.href}>{route.label}</NavLink>
                </Button>
              ))}
            </nav>

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetContent side="left" className="bg-background">
                <nav className="flex flex-col gap-y-2 pt-9">
                  {routes?.map((route) => (
                    <Button
                      key={route.href}
                      size="sm"
                      variant="ghost"
                      className={cn(
                        `w-full font-bold py-4.5 
                       border-none
                       bg-accent/70 text-foreground/90
                       hover:bg-accent hover:text-accent-foreground
                       transition justify-start rounded-lg`,
                        pathname === route.href &&
                          "bg-[#2b4cc9] text-white hover:text-white dark:bg-[#3a5ef0]"
                      )}
                      asChild
                    >
                      <NavLink to={route.href}>
                        {route.label}
                      </NavLink>
                    </Button>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            {/* {} */}
            {/* Right side - User actions */}
            <div className="flex items-center space-x-4">
              <UserNav
                userName={user?.name || ""}
                profilePicture={user?.profilePicture || ""}
                onLogout={() => setIsLogoutDialogOpen(true)}
              />
            </div>
          </div>
        </div>
      </header>

      <LogoutDialog
        isOpen={isLogoutDialogOpen}
        setIsOpen={setIsLogoutDialogOpen}
      />
    </>
  );
};

export default Navbar;
