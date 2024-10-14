import { useForm } from "react-hook-form";
import { UserData } from "../types/UserData";
import { Box, Button, Modal } from "@mui/material";
import { useEffect } from "react";

interface ModalUserProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: UserData, initialData?: UserData) => void;
    initialData: UserData | null;
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 1,
    borderRadius: 1,
};
const ModalUser: React.FC<ModalUserProps> = ({ open, onClose, onSubmit, initialData }) => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<UserData>({
        mode: "onTouched",
    });

    useEffect(() => {
        if (open) {
            console.log("Modal opened. Initial data:", initialData);
            if (initialData) {
                setValue('name', initialData.name || '');
                setValue('email', initialData.email || '');
            } else {
                reset();
            }
        }
    }, [open, initialData, setValue, reset]);

    const handleClose = () => {
        reset();
        onClose();
    };
    const onSubmitForm = (data: UserData) => {
        onSubmit(data, initialData ?? undefined);
        handleClose();
    };
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <span className="text-[20px] text-blue-500">
                    {initialData ? "Cập nhật thông tin nhân viên" : "Thêm nhân viên mới"}
                </span>
                <form onSubmit={handleSubmit(onSubmitForm)} className="mt-5">
                    <div className="mb-4 flex justify-between">
                        <div className="flex-1 mr-2">
                            <label htmlFor="username">Tài khoản</label>
                            <input
                                id="username"
                                {...register('username', { required: "*Vui lòng nhập tài khoản" })}
                                type="text"
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                            {errors.username && <p className="text-red-500 text-[13px]">{errors.username.message}</p>}
                        </div>

                        <div className="flex-1 mx-2">
                            <label htmlFor="email">Số điện thoại</label>
                            <input
                                id="phone"
                                {...register('phone', { required: "*Vui lòng nhập số điện thoại" })}
                                type="phone"
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                            {errors.phone && <p className="text-red-500 text-[13px]">{errors.phone.message}</p>}
                        </div>

                        <div className="flex-1 ml-2">
                            <label htmlFor="address">Địa chỉ</label>
                            <input
                                id="address"
                                {...register('address', { required: "*Vui lòng nhập địa chỉ" })}
                                type="text"
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                            {errors.address && <p className="text-red-500 text-[13px]">{errors.address.message}</p>}
                        </div>
                    </div>
                    <div className="mb-4 flex justify-between">
                        <div className="flex-1 mr-2">
                            <label htmlFor="password">Mật khẩu</label>
                            <input
                                id="password"
                                {...register('password', { required: "*Vui lòng nhập mật khẩu" })}
                                type="text"
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                            {errors.password && <p className="text-red-500 text-[13px]">{errors.password.message}</p>}
                        </div>

                        <div className="flex-1 mx-2">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                {...register('email')}
                                type="email"
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                        </div>

                        <div className="flex-1 mx-2">
                            <label htmlFor="birth_date">Ngày sinh</label>
                            <input
                                id="birth_date"
                                {...register('birth_date')}
                                type="date"
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                        </div>
                    </div>
                    <div className="mb-4 flex justify-between">
                        <div className="flex-1 mr-2">
                            <label htmlFor="status">Trạng thái</label>
                            <select
                                id="status"
                                {...register('status')}
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            >
                                <option value="true">Hoạt động</option>
                                <option value="false">Không hoạt động</option>
                            </select>
                            {errors.status && <p className="text-red-500 text-[13px]">{errors.status.message}</p>}
                        </div>


                        <div className="flex-1 ml-2">
                            <label htmlFor="license_category">Chức vụ</label>
                            <select
                                id="license_category"
                                {...register('license_category')}
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            >
                                <option value={1}>Tài xế</option>
                                <option value={2}>Nhân viên hành chính</option>
                                <option value={3}>Quản trị viên</option>
                            </select>
                        </div>

                        <div className="flex-1 ml-2">
                            <label htmlFor="license_category">Hạng bằng lái</label>
                            <select
                                id="license_category"
                                {...register('license_category')}
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            >
                                <option value={1}>Hạng B1</option>
                                <option value={2}>Hạng B2</option>
                                <option value={3}>Hạng C</option>
                                <option value={4}>Hạng D</option>
                                <option value={5}>Hạng E</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-4 flex justify-between">
                        <div className="flex-1 mr-2">
                            <label htmlFor="gender">Giới tính</label>
                            <select
                                id="gender"
                                {...register('gender')}
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            >
                                <option value={1}>Nam</option>
                                <option value={2}>Nữ</option>
                                <option value={3}>Khác</option>
                            </select>
                        </div>
                        <div className="flex-1 mx-2">
                            <label htmlFor="cccd">CCCD</label>
                            <input
                                id="cccd"
                                {...register('cccd')}
                                type="text"
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex-1 mx-2">
                            <label htmlFor="expiration_date">Ngày hết hạn bằng lái</label>
                            <input
                                id="expiration_date"
                                {...register('expiration_date')}
                                type="date"
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                        </div>





                    </div>

                    <div className="flex justify-end mt-4">
                        <Button sx={{ marginRight: 2 }} onClick={handleClose} variant="outlined" color="secondary">
                            Hủy
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            {initialData ? "Cập nhật" : "Thêm"}
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    )
}
export default ModalUser;