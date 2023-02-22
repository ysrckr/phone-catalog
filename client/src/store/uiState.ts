import { proxy } from 'valtio';

export const uiState = proxy({
  isMobileNavOpen: false,
  toggleMobileNav: () => {
    uiState.isMobileNavOpen = !uiState.isMobileNavOpen;
  },
});
