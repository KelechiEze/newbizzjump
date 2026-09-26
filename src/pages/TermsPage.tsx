import React, { useEffect } from 'react';
import { LegalLayout } from '../components/LegalLayout';
import { TERMS_AND_CONDITIONS } from '../data/legalData';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Terms & Conditions | Bizzjump Creative Digital Agency';
  }, []);

  return <LegalLayout document={TERMS_AND_CONDITIONS} />;
};
