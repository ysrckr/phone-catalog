import { proxy } from 'valtio';

export const uiState = proxy({
  isMobileNavOpen: false,
  toggleMobileNav: () => {
    uiState.isMobileNavOpen = !uiState.isMobileNavOpen;
    if (uiState.isMobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  },
});
