import { useState } from 'react';
import { login as apiLogin } from '../api/authAPI';
import Toast from '@/lib/toast';
import axios from 'axios';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<boolean>(false);

    const login = async (username: string, password: string) => {
        setLoading(true);
        setSuccess(false);
        try {
            const data = await apiLogin({ username, password });
            console.log('Login successful:', data);
            setSuccess(true);
            Toast.success('Đăng nhập thành công!');
            return data;
        } catch (error) {
            console.error('Login failed:', error);
            if (error instanceof axios.AxiosError && error.response) {
                const status = error.response.status;

                if (status === 401) {
                    Toast.error('Mật khẩu không đúng'); // 401
                } else if (status === 403) {
                    Toast.error('Tài khoản bị khóa'); // 403
                } else if (status === 404) {
                    Toast.error('Tài khoản không tồn tại'); // 404
                } else {
                    Toast.error('Lỗi hệ thống'); // 500
                }
            } else {
                Toast.error('Lỗi hệ thống'); // 500
            }
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, success };
};

export default useLogin;
