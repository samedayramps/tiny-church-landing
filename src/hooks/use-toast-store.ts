import { createContextId, useContext, useContextProvider, useStore } from "@builder.io/qwik";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  type?: 'default' | 'success' | 'error';
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
}

export const ToastContext = createContextId<ToastStore>('toast-store');

export const useToastStore = () => {
  return useContext(ToastContext);
};

export const useToastProvider = () => {
  const store = useStore<ToastStore>({
    toasts: [],
  });
  useContextProvider(ToastContext, store);
  return store;
};

let id = 0;
export const toast = (store: ToastStore, toast: Omit<Toast, 'id'>) => {
  const toastWithId = { ...toast, id: (++id).toString() };
  store.toasts = [...store.toasts, toastWithId];
  
  if (toast.duration !== 0) {
    setTimeout(() => {
      store.toasts = store.toasts.filter(t => t.id !== toastWithId.id);
    }, toast.duration || 3000);
  }
  
  return toastWithId.id;
}; 