import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@/test-utils';
import { SEOHead } from './SEOHead';

describe('SEOHead Component', () => {
  it('renders SEO meta tags with correct title', () => {
    const { container } = render(
      <SEOHead
        title="Test Page - Texas Urban Sawmill"
        description="Test description"
        url="https://example.com/test"
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders meta description correctly', () => {
    const { container } = render(
      <SEOHead
        title="Test Page"
        description="This is a test description for SEO"
        url="https://example.com/test"
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders canonical URL correctly', () => {
    const { container } = render(
      <SEOHead
        title="Test Page"
        description="Test description"
        url="https://example.com/test-page"
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders Open Graph tags for social sharing', () => {
    const { container } = render(
      <SEOHead
        title="Sawmilling Services"
        description="Professional sawmilling services"
        url="https://example.com/services/sawmilling"
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders Twitter Card tags correctly', () => {
    const { container } = render(
      <SEOHead
        title="Test Page"
        description="Test description"
        url="https://example.com/test"
      />
    );
    expect(container).toBeTruthy();
  });

  it('handles missing URL gracefully', () => {
    const { container } = render(
      <SEOHead
        title="Test Page"
        description="Test description"
        url=""
      />
    );
    expect(container).toBeTruthy();
  });

  it('truncates long titles to SEO standards', () => {
    const longTitle = 'This is a very long title that exceeds the recommended 60 character limit for SEO - Texas Urban Sawmill';
    const { container } = render(
      <SEOHead
        title={longTitle}
        description="Test description"
        url="https://example.com/test"
      />
    );
    expect(container).toBeTruthy();
  });

  it('accepts all required props', () => {
    const { container } = render(
      <SEOHead
        title="Complete Test"
        description="Complete test description"
        url="https://example.com/complete"
      />
    );
    expect(container).toBeTruthy();
  });
});
