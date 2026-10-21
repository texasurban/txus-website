import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';

// Custom render function that wraps components with necessary providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <HelmetProvider>
      {children}
    </HelmetProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
