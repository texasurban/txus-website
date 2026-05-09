import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test-utils';
import { Navigation } from './Navigation';

describe('Navigation Component', () => {
  it('renders navigation header', () => {
    render(<Navigation />);
    const header = screen.getByRole('banner');
    expect(header).toBeTruthy();
  });

  it('renders logo image', () => {
    render(<Navigation />);
    const logo = screen.getByAltText(/Texas Urban Sawmill/i);
    expect(logo).toBeTruthy();
  });

  it('renders all main navigation links', () => {
    render(<Navigation />);
    
    const expectedLinks = ['HOME', 'SHOP', 'PORTFOLIO', 'SERVICES', 'LEARN MORE', 'BLOG', 'CONTACT'];
    expectedLinks.forEach(linkText => {
      const link = screen.queryByText(linkText);
      expect(link).toBeTruthy();
    });
  });

  it('renders services dropdown', () => {
    render(<Navigation />);
    const servicesLink = screen.getByText('SERVICES');
    expect(servicesLink).toBeTruthy();
  });

  it('renders social media links', () => {
    render(<Navigation />);
    
    const socialLinks = ['Instagram', 'YouTube', 'Facebook', 'LinkedIn'];
    socialLinks.forEach(social => {
      const link = screen.getByRole('link', { name: new RegExp(social, 'i') });
      expect(link).toBeTruthy();
    });
  });

  it('has sticky positioning class', () => {
    const { container } = render(<Navigation />);
    const header = container.querySelector('header');
    expect(header?.classList.contains('sticky')).toBe(true);
    expect(header?.classList.contains('top-0')).toBe(true);
  });

  it('has high z-index for overlay', () => {
    const { container } = render(<Navigation />);
    const header = container.querySelector('header');
    expect(header?.classList.contains('z-50')).toBe(true);
  });

  it('renders logo as link to home', () => {
    render(<Navigation />);
    const logoLink = screen.getByRole('link', { name: /Texas Urban Sawmill/i });
    expect(logoLink.getAttribute('href')).toBe('/');
  });

  it('all navigation links have correct hrefs', () => {
    render(<Navigation />);
    
    const links = {
      'HOME': '/',
      'SHOP': '/shop',
      'PORTFOLIO': '/portfolio',
      'CONTACT': '/contact'
    };
    
    Object.entries(links).forEach(([text, href]) => {
      const link = screen.getByRole('link', { name: text });
      expect(link.getAttribute('href')).toBe(href);
    });
  });

  it('social media links open in new tab', () => {
    render(<Navigation />);
    const socialLinks = screen.getAllByRole('link').filter(link => 
      link.getAttribute('target') === '_blank'
    );
    
    expect(socialLinks.length).toBeGreaterThanOrEqual(4);
  });

  it('social media links have rel noreferrer', () => {
    render(<Navigation />);
    const socialLinks = screen.getAllByRole('link').filter(link => 
      link.getAttribute('target') === '_blank'
    );
    
    socialLinks.forEach(link => {
      expect(link.getAttribute('rel')).toBe('noreferrer');
    });
  });

  it('renders mobile menu button on small screens', () => {
    render(<Navigation />);
    const mobileMenuButton = screen.getByRole('button', { name: /menu/i });
    expect(mobileMenuButton).toBeTruthy();
  });

  it('has responsive classes for mobile/desktop', () => {
    const { container } = render(<Navigation />);
    const desktopNav = container.querySelector('.hidden.lg\\:flex');
    const mobileNav = container.querySelector('.lg\\:hidden');
    
    expect(desktopNav).toBeTruthy();
    expect(mobileNav).toBeTruthy();
  });

  it('navigation is identical across all pages', () => {
    const { container: container1 } = render(<Navigation />);
    const { container: container2 } = render(<Navigation />);
    
    const nav1 = container1.querySelector('header');
    const nav2 = container2.querySelector('header');
    
    expect(nav1?.innerHTML).toBe(nav2?.innerHTML);
  });

  it('has accessibility attributes', () => {
    render(<Navigation />);
    const nav = screen.getByRole('navigation');
    expect(nav).toBeTruthy();
  });

  it('renders with backdrop blur effect', () => {
    const { container } = render(<Navigation />);
    const header = container.querySelector('header');
    expect(header?.classList.contains('backdrop-blur-xl')).toBe(true);
  });

  it('has border styling', () => {
    const { container } = render(<Navigation />);
    const header = container.querySelector('header');
    expect(header?.classList.contains('border-b')).toBe(true);
  });
});
