"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import useAuth from '../hook/useAuth';
import { login } from '../../../redux/authSlice';


interface FormData {
    username: string;
    password: string;
}
const LoginForm = () => {
    const dispatch = useDispatch();
    const { login: loginAPI } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        try {
            const response = await loginAPI(data.username, data.password);
            if (response !== undefined) {
                console.log("Dispatching data:", response);
                dispatch(login({ id: response.id, name: response.name, companyId: response.companyId }));
            }


        } catch (error) {
            console.error("Login failed:", error);
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '20px', borderRadius: '10px', textAlign: 'left', marginTop: '20px' }}>
            <div>
                <label style={{ display: 'block', color: '#0a2e5c', fontWeight: '600', fontSize: '14px' }}>Tài khoản</label>
                <input
                    style={{ width: '100%', padding: '10px', marginTop: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
                    type="text"
                    {...register('username', { required: '* Vui lòng nhập tài khoản' })}
                />
                {errors.username && <span style={{ color: 'red', fontSize: '13px' }}>{errors.username.message}</span>}
            </div>
            <div>
                <label style={{ display: 'block', color: '#0a2e5c', fontWeight: '600', fontSize: '14px', marginTop: '10px' }}>Mật khẩu</label>
                <input
                    style={{ width: '100%', padding: '10px', marginTop: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
                    type="password"
                    {...register('password', { required: '* Vui lòng nhập mật khẩu' })}
                />
                {errors.password && <span style={{ color: 'red', fontSize: '13px' }}>{errors.password.message}</span>}
            </div>
            <button type="submit" style={{ width: '100%', backgroundColor: '#0072bc', color: 'white', padding: '14px 20px', margin: '8px 0', border: 'none', borderRadius: '4px', fontSize: '16px', display: 'inline', marginTop: '30px', fontFamily: 'Rounded' }}>Đăng Nhập</button>
        </form>
    );
};

export default LoginForm;