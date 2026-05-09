import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test-utils';
import { Footer } from './Footer';

describe('Footer Component', () => {
  it('renders footer element', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeTruthy();
  });

  it('displays contact section heading', () => {
    render(<Footer />);
    const heading = screen.getByText('Contact');
    expect(heading).toBeTruthy();
  });

  it('displays contact description', () => {
    render(<Footer />);
    const description = screen.getByText(/Get in touch with us for custom sawmilling/i);
    expect(description).toBeTruthy();
  });

  it('renders phone contact tile', () => {
    render(<Footer />);
    const phoneLink = screen.getByRole('link', { name: /phone/i });
    expect(phoneLink).toBeTruthy();
    expect(phoneLink.getAttribute('href')).toContain('tel:');
  });

  it('renders email contact tile', () => {
    render(<Footer />);
    const emailLink = screen.getByRole('link', { name: /email/i });
    expect(emailLink).toBeTruthy();
    expect(emailLink.getAttribute('href')).toContain('mailto:');
  });

  it('renders location contact tile', () => {
    render(<Footer />);
    const locationLink = screen.getByRole('link', { name: /location/i });
    expect(locationLink).toBeTruthy();
  });

  it('renders divider line', () => {
    render(<Footer />);
    const divider = document.querySelector('.border-t');
    expect(divider).toBeTruthy();
  });

  it('renders branding section with logo', () => {
    render(<Footer />);
    const logo = screen.getByAltText(/Texas Urban Sawmill/i);
    expect(logo).toBeTruthy();
  });

  it('renders company name in footer', () => {
    render(<Footer />);
    const companyName = screen.getByText(/Texas Urban Sawmill/i);
    expect(companyName).toBeTruthy();
  });

  it('applies correct styling classes', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer?.classList.contains('bg-[#2a2a2a]')).toBe(true);
    expect(footer?.classList.contains('text-white')).toBe(true);
  });

  it('has correct background color for dark theme', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    const style = window.getComputedStyle(footer!);
    // Check that footer has dark background (charcoal)
    expect(footer?.classList.contains('bg-[#2a2a2a]')).toBe(true);
  });

  it('renders footer on all pages identically', () => {
    const { container: container1 } = render(<Footer />);
    const { container: container2 } = render(<Footer />);
    
    const footer1 = container1.querySelector('footer');
    const footer2 = container2.querySelector('footer');
    
    expect(footer1?.innerHTML).toBe(footer2?.innerHTML);
  });

  it('has accessible contact links', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link');
    
    // Should have at least phone, email, location, and social links
    expect(links.length).toBeGreaterThanOrEqual(7);
  });

  it('renders social media links', () => {
    render(<Footer />);
    const instagramLink = screen.getByRole('link', { name: /instagram/i });
    const youtubeLink = screen.getByRole('link', { name: /youtube/i });
    const facebookLink = screen.getByRole('link', { name: /facebook/i });
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    
    expect(instagramLink).toBeTruthy();
    expect(youtubeLink).toBeTruthy();
    expect(facebookLink).toBeTruthy();
    expect(linkedinLink).toBeTruthy();
  });

  it('social media links open in new tab', () => {
    render(<Footer />);
    const socialLinks = screen.getAllByRole('link').filter(link => 
      link.getAttribute('target') === '_blank'
    );
    
    expect(socialLinks.length).toBeGreaterThan(0);
  });
});
