import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const netlifyBadgeSelectors = [
  '#netlify-badge',
  '.netlify-badge',
  '[data-netlify-badge]',
  '[id*="netlify-badge" i]',
  '[class*="netlify-badge" i]',
  '[aria-label*="powered by netlify" i]',
  '[title*="powered by netlify" i]',
  'iframe[src*="netlify.com" i][title*="badge" i]',
  'iframe[src*="netlify.app" i][title*="badge" i]',
].join(',');

function removeInjectedNetlifyBadge(root: ParentNode = document) {
  root.querySelectorAll(netlifyBadgeSelectors).forEach((element) => element.remove());

  root.querySelectorAll('a, button').forEach((element) => {
    if (element.textContent?.replace(/\s+/g, ' ').trim().toLowerCase() === 'powered by netlify') {
      element.remove();
    }
  });
}

removeInjectedNetlifyBadge();

const netlifyBadgeObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node instanceof Element) {
        if (node.matches(netlifyBadgeSelectors)) {
          node.remove();
          return;
        }

        removeInjectedNetlifyBadge(node);
      }
    });
  });
});

netlifyBadgeObserver.observe(document.documentElement, { childList: true, subtree: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
