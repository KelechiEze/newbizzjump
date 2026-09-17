import React, { useEffect } from 'react';
import { LegalLayout } from '../components/LegalLayout';
import { COOKIE_POLICY } from '../data/legalData';

export const CookiePolicyPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Cookie Policy | Bizzjump Creative Digital Agency';
  }, []);

  return <LegalLayout document={COOKIE_POLICY} />;
};
