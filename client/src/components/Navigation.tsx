/**
 * Navigation Component - TXUS Master Navigation Bar
 * 
 * This component provides the standard navigation bar used across all TXUS pages.
 * It's extracted from the Home page and includes:
 * - Desktop navigation with logo, menu items, and social links
 * - Mobile responsive menu
 * - Services dropdown with submenu
 * - SEO-optimized structure
 * 
 * Usage:
 * import { Navigation } from "@/components/Navigation";
 * 
 * <Navigation />
 */

import React, { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight, ChevronDown, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const logoUrl = "/manus-storage/TXUSBlack4.5inx3in72DPI_fe5f0d81_0f47ce66.png";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Portfolio", href: "/portfolio" },
  {
    label: "Services",
    href: "/services",
    submenu: [
      { label: "Lumber, Beams, Mantels & Slabs", href: "/services/lumber" },
      { label: "Sawmilling & Kiln Drying", href: "/services/sawmilling" },
      { label: "Custom Heirloom Furniture", href: "/portfolio" },
      { label: "Tree Re-Use Construction", href: "/services/tree-reuse" },
      { label: "Log Transport & Crane", href: "/services/log-transport" },
      { label: "Tree Care & Removals", href: "/services/tree-care" },
      { label: "Millworks, CNC, & Laser", href: "/services/millworks" },
    ],
  },
  { label: "Learn More", href: "/learn-more" },
  {
    label: "Blog",
    href: "/blog",
    submenu: [
      { label: "Sawmill Projects", href: "/blog#sawmill-projects" },
      { label: "Climate-Smart Construction", href: "/blog#climate-smart-construction" },
      { label: "Custom Interior Projects", href: "/blog#custom-interior-projects" },
      { label: "Custom Exterior Projects", href: "/blog#custom-exterior-projects" },
      { label: "Community & Non-Profit Projects", href: "/blog#community-and-non-profit-projects" },
      { label: "Facility & Operations", href: "/blog#facility-and-operations" },
      { label: "Kiln Drying Projects", href: "/blog#kiln-drying-projects" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/txurbansawmill",
    icon: Instagram,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/c/TexasUrbanSawmillLLC",
    icon: Youtube,
  },
  {
    label: "Facebook",
    href: "http://facebook.com/texasurbansawmill",
    icon: Facebook,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/devin-ginther",
    icon: Linkedin,
  },
];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [blogDropdownOpen, setBlogDropdownOpen] = useState(false);
  const [location] = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/55 bg-[color:var(--header-bg)]/90 backdrop-blur-xl">
      {/* Desktop Navigation */}
      <div className="container hidden lg:flex items-center justify-between gap-4 py-2 sm:py-3">
        {/* Logo on left */}
        <a href="/" className="flex items-center gap-4 flex-shrink-0" title="Texas Urban Sawmill Home">
          <img
            src={logoUrl}
            alt="Texas Urban Sawmill"
            className="h-14 w-auto object-contain sm:h-16 drop-shadow-md"
          />
        </a>

        {/* Navigation links centered */}
        <nav className="flex items-center justify-center gap-5 flex-1" aria-label="Main navigation">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <a
                href={item.href}
                className={`nav-link text-sm font-medium uppercase tracking-[0.08em] whitespace-nowrap flex items-center gap-1 ${
                  isActive(item.href) ? "text-primary font-bold" : ""
                }`}
                title={`Navigate to ${item.label}`}
              >
                {item.label}
                {item.submenu && <ChevronDown className="h-3 w-3" aria-hidden="true" />}
              </a>
              {item.submenu && (
                <div
                  className="absolute left-0 mt-0 w-56 bg-white border border-primary/20 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                  role="menu"
                >
                  {item.submenu.map((subitem) => (
                    <a
                      key={subitem.label}
                      href={subitem.href}
                      className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-primary/10 border-b border-primary/10 last:border-b-0"
                      role="menuitem"
                      title={`Navigate to ${subitem.label}`}
                    >
                      {subitem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Social links on right */}
        <div className="flex items-center gap-3 flex-shrink-0" aria-label="Social media links">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit our ${label} page`}
              className="social-chip"
              title={`Texas Urban Sawmill on ${label}`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="container flex items-center justify-between gap-6 py-2 sm:py-3 lg:hidden">
        <a href="/" className="flex items-center gap-4" title="Texas Urban Sawmill Home">
          <img
            src={logoUrl}
            alt="Texas Urban Sawmill"
            className="h-14 w-auto object-contain sm:h-16"
          />
        </a>

        <button
          type="button"
          className="inline-flex items-center rounded-none border border-primary px-3 py-2 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-primary"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          title="Toggle mobile menu"
        >
          Menu
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen ? (
        <div id="mobile-nav" className="border-t border-primary/15 bg-white lg:hidden" role="navigation">
          <div className="container flex flex-col gap-2 py-4">
            {navItems.map((item) => {
              const isServicesDropdown = item.label === "Services" && servicesDropdownOpen;
              const isBlogDropdown = item.label === "Blog" && blogDropdownOpen;
              const isDropdownOpen = isServicesDropdown || isBlogDropdown;
              
              return (
              <div key={item.label}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => {
                        if (item.label === "Services") {
                          setServicesDropdownOpen(!servicesDropdownOpen);
                        } else if (item.label === "Blog") {
                          setBlogDropdownOpen(!blogDropdownOpen);
                        }
                      }}
                      className="nav-link justify-between py-2 w-full"
                      aria-expanded={isDropdownOpen}
                      title={`Toggle ${item.label.toLowerCase()} submenu`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                    {isDropdownOpen && (
                      <div className="bg-primary/5 border-l-2 border-primary" role="menu">
                        {item.submenu.map((subitem) => (
                          <a
                            key={subitem.label}
                            href={subitem.href}
                            className="block px-6 py-2 text-sm font-medium text-foreground hover:bg-primary/10"
                            onClick={() => {
                              setMenuOpen(false);
                              setServicesDropdownOpen(false);
                              setBlogDropdownOpen(false);
                            }}
                            role="menuitem"
                            title={`Navigate to ${subitem.label}`}
                          >
                            {subitem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={item.href}
                    className={`nav-link justify-between py-2 ${
                      isActive(item.href) ? "text-primary font-bold" : ""
                    }`}
                    onClick={() => setMenuOpen(false)}
                    title={`Navigate to ${item.label}`}
                  >
                    {item.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            );
            })}
            <div className="mt-2 flex items-center gap-2" aria-label="Social media links">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit our ${label} page`}
                  className="social-chip"
                  title={`Texas Urban Sawmill on ${label}`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
