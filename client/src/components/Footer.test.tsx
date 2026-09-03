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
    const description = screen.getByText(/Whether you're inquiring about custom pieces/i);
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
    const locationText = screen.getByText('Location');
    expect(locationText).toBeTruthy();
    expect(screen.getByText('Dripping Springs, Texas')).toBeTruthy();
  });

  it('renders divider line', () => {
    render(<Footer />);
    const divider = document.querySelector('.border-t');
    expect(divider).toBeTruthy();
  });

  it('renders branding section', () => {
    render(<Footer />);
    const branding = screen.getByText(/Texas Urban Sawmill · Dripping Springs, Texas/i);
    expect(branding).toBeTruthy();
  });

  it('renders company name in footer', () => {
    render(<Footer />);
    const companyName = screen.getByText('Texas Urban Sawmill · Dripping Springs, Texas');
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
    
    // The footer exposes phone and email as links; location is informational text.
    expect(links.length).toBeGreaterThanOrEqual(2);
  });

  it('keeps social media links in the shared navigation rather than the footer', () => {
    render(<Footer />);
    expect(screen.queryByRole('link', { name: /instagram/i })).toBeNull();
    expect(screen.queryByRole('link', { name: /youtube/i })).toBeNull();
    expect(screen.queryByRole('link', { name: /facebook/i })).toBeNull();
    expect(screen.queryByRole('link', { name: /linkedin/i })).toBeNull();
  });

  it('contact links do not require a new tab', () => {
    render(<Footer />);
    const contactLinks = screen.getAllByRole('link');
    expect(contactLinks.every((link) => link.getAttribute('target') !== '_blank')).toBe(true);
  });
});
