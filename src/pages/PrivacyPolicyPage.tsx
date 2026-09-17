import React, { useEffect } from 'react';
import { LegalLayout } from '../components/LegalLayout';
import { PRIVACY_POLICY } from '../data/legalData';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | Bizzjump Creative Digital Agency';
  }, []);

  return <LegalLayout document={PRIVACY_POLICY} />;
};
