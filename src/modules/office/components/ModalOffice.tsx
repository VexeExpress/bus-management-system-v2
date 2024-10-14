import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { OfficeData } from "../types/OfficeData";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import React from "react";
interface ModalOfficeProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: OfficeData, initialData?: OfficeData) => void;
    initialData: OfficeData | null;
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 1,
    borderRadius: 1,
};
const ModalOffice: React.FC<ModalOfficeProps> = ({ open, onClose, onSubmit, initialData  }) => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<OfficeData>({
        mode: "onTouched",
    });
    useEffect(() => {
        if (open) {
            console.log("Modal opened. Initial data:", initialData);
            if (initialData) {
                setValue('name', initialData.name || '');
                setValue('code', initialData.code || '');
                setValue('phone', initialData.phone || '');
                setValue('address', initialData.address || '');
                setValue('note', initialData.note || '');
            } else {
                reset();
            }
        }
    }, [open, initialData, setValue, reset]);
    const handleClose = () => {
        reset();
        onClose();
    };
    const onSubmitForm = (data: OfficeData) => {
        onSubmit(data, initialData ?? undefined);
        handleClose();
    };
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <span className="text-[20px] text-blue-500">
                    {initialData ? "Cập nhật văn phòng" : "Thêm văn phòng mới"}
                </span>
                <form onSubmit={handleSubmit(onSubmitForm)} className="mt-5">
                    <div className="mb-4">
                        <label htmlFor="name">Tên văn phòng</label>
                        <input
                            id="name"
                            {...register('name', { required: "*Vui lòng nhập tên văn phòng" })}
                            type="text"
                            placeholder="Tên văn phòng"
                            className="w-full p-2 mt-1 border border-gray-300 rounded"
                        />
                        {errors.name && <p className="text-red-500 text-[13px]">{errors.name.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="code">Mã văn phòng</label>
                        <input
                            id="code"
                            {...register('code', { required: "*Vui lòng nhập mã văn phòng" })}
                            type="text"
                            placeholder="Mã văn phòng"
                            className="w-full p-2 mt-1 border border-gray-300 rounded"
                        />
                        {errors.code && <p className="text-red-500 text-[13px]">{errors.code.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone">Điện thoại</label>
                        <input
                            id="phone"
                            {...register('phone', {
                                required: "*Vui lòng nhập số điện thoại",
                                pattern: { value: /^[0-9]+$/, message: "*Số điện thoại không hợp lệ" }
                            })}
                            type="text"
                            placeholder="Điện thoại"
                            className="w-full p-2 mt-1 border border-gray-300 rounded"
                        />
                        {errors.phone && <p className="text-red-500 text-[13px]">{errors.phone.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="address">Địa chỉ</label>
                        <input
                            id="address"
                            {...register('address', { required: "*Vui lòng nhập địa chỉ" })}
                            type="text"
                            placeholder="Địa chỉ"
                            className="w-full p-2 mt-1 border border-gray-300 rounded"
                        />
                        {errors.address && <p className="text-red-500 text-[13px]">{errors.address.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="note">Ghi chú</label>
                        <input
                            id="note"
                            {...register('note')}
                            type="text"
                            placeholder="Ghi chú"
                            className="w-full p-2 mt-1 border border-gray-300 rounded"
                        />
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
export default ModalOffice;