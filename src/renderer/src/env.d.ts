/// <reference types="svelte" />
/// <reference types="vite/client" />

import { ElectronAPI } from '@electron-toolkit/preload';
import type { Api } from '../../globals/types';

declare global {
  interface Window {
    api: Api;
  }
}
