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
            <label className="block text-[#0a2e5c] font-semibold text-[14px]">Tài khoản</label>
                <input
                     className="w-full p-2 mt-2 box-border border border-gray-300 rounded-md"
                    type="text"
                    {...register('username', { required: '* Vui lòng nhập tài khoản' })}
                />
                {errors.username && <span className="text-red-500 text-[13px]">{errors.username.message}</span>}
            </div>
            <div>
                <label className="block text-[#0a2e5c] font-semibold text-[14px] mt-3">Mật khẩu</label>
                <input
                    className="w-full p-2 mt-2 box-border border border-gray-300 rounded-md"
                    type="password"
                    {...register('password', { required: '* Vui lòng nhập mật khẩu' })}
                />
                {errors.password && <span className="text-red-500 text-[13px]">{errors.password.message}</span>}
            </div>
            <button type="submit" className="w-full bg-[#0072bc] text-white py-3 px-5 my-2 border-none rounded-md text-[16px] inline mt-[30px] font-rounded">Đăng Nhập</button>
        </form>
    );
};

export default LoginForm;