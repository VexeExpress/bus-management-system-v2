// lib/toast.ts
import { toast, ToastPosition } from 'react-toastify';

const Toast = {
    success: (message: string): void => {
        toast.success(message, {
            position: 'top-right' as ToastPosition,
            autoClose: 3000,
        });
    },
    error: (message: string): void => {
        toast.error(message, {
            position: 'top-right' as ToastPosition,
            autoClose: 3000,
        });
    },
    info: (message: string): void => {
        toast.info(message, {
            position: 'top-right' as ToastPosition,
            autoClose: 3000,
        });
    },
    warning: (message: string): void => {
        toast.warning(message, {
            position: 'top-right' as ToastPosition,
            autoClose: 3000,
        });
    },
};

export default Toast;
