import { toast } from 'react-toastify';
import type { ToastOptions } from 'react-toastify';

// Default toast configuration
const defaultToastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// Custom toast functions with consistent styling
export const showSuccessToast = (message: string, options?: Partial<ToastOptions>) => {
  toast.success(message, { ...defaultToastOptions, ...options });
};

export const showErrorToast = (message: string, options?: Partial<ToastOptions>) => {
  toast.error(message, { 
    ...defaultToastOptions, 
    autoClose: 5000, // Longer duration for errors
    ...options 
  });
};

export const showInfoToast = (message: string, options?: Partial<ToastOptions>) => {
  toast.info(message, { ...defaultToastOptions, ...options });
};

export const showWarningToast = (message: string, options?: Partial<ToastOptions>) => {
  toast.warn(message, { ...defaultToastOptions, ...options });
};

// Specific toast messages for common actions
export const toastMessages = {
  analysisComplete: '🚀 Analysis complete! Fresh insights ready.',
  analysisError: '❌ Analysis failed. Please check your API settings and try again.',
  settingsSaved: '🚀 Settings Secured Locally!',
  copiedToNotion: '📋 Formatted for Notion! Just paste (Ctrl+V) into your workspace.',
  apiKeyMissing: '⚙️ Please configure your API key in Settings first!',
  invalidApiKey: '🔑 Invalid API key. Please check your settings.',
  networkError: '🌐 Network error. Please check your connection.',
  cacheRestored: (count: number) => `📚 Restored ${count} cached analysis${count > 1 ? 'es' : ''} from previous sessions.`,
  showingCached: '📋 Showing cached results. Click "RUN AI" to refresh.',
  showingRecent: '📚 Showing your most recent analysis.',
  cacheRestoreError: '⚠️ Could not restore previous analysis data.',
};