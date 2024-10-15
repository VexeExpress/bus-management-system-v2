import { Box, Button, Modal } from "@mui/material";
import { VehicleData } from "../types/VehicleData";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface ModalVehicleProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: VehicleData, initialData?: VehicleData) => void;
    initialData: VehicleData | null;
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
const ModalVehicle: React.FC<ModalVehicleProps> = ({ open, onClose, onSubmit, initialData }) => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<VehicleData>({
        mode: "onTouched",
    });
    useEffect(() => {
        if (open) {
            console.log("Modal opened. Initial data:", initialData);
            if (initialData) {
                setValue('licensePlate', initialData.licensePlate || '');
                setValue('phone', initialData.phone || '');
                setValue('brand', initialData.brand || '');
                setValue('color', initialData.color || '');
                setValue('chassisNumber', initialData.chassisNumber || '');
                setValue('machineNumber', initialData.machineNumber || '');
                setValue('category', initialData.category || 1);
                setValue('registrationDeadline', initialData.registrationDeadline || '');
                setValue('insuranceTerm', initialData.insuranceTerm || '');

            } else {
                reset();
            }
        }
    }, [open, initialData, setValue, reset]);

    const handleClose = () => {
        reset();
        onClose();
    };
    const onSubmitForm = (data: VehicleData) => {
        onSubmit(data, initialData ?? undefined);
        handleClose();
    };
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <span className="text-[20px] text-blue-500">
                    {initialData ? "Cập nhật thông tin phương tiện" : "Thêm phương tiện mới"}
                </span>
                <form onSubmit={handleSubmit(onSubmitForm)} className="mt-5">
                    <div className="mb-4 flex justify-between">
                        <div className="flex-1 mr-2">
                            <label htmlFor="licensePlate">Biển số xe</label>
                            <input
                                id="licensePlate"
                                {...register('licensePlate', { required: "*Vui lòng nhập biển số xe" })}
                                type="text"
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                            {errors.licensePlate && <p className="text-red-500 text-[13px]">{errors.licensePlate.message}</p>}
                        </div>
                        <div className="flex-1 ml-2">
                            <label htmlFor="phone">Số điện thoại xe</label>
                            <input
                                id="phone"
                                {...register('phone')}
                                type="text"
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex-1 ml-2">
                            <label htmlFor="brand">Hãng xe</label>
                            <input
                                id="brand"
                                {...register('brand')}
                                type="text"
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                        </div>
                    </div>
                    <div className="mb-4 flex justify-between">
                        <div className="flex-1 mr-2">
                            <label htmlFor="color">Màu xe</label>
                            <input
                                id="color"
                                {...register('color')}
                                type="text"
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex-1 mx-2">
                            <label htmlFor="chassisNumber">Số khung</label>
                            <input
                                id="chassisNumber"
                                {...register('chassisNumber')}
                                type="phone"
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex-1 mx-2">
                            <label htmlFor="machineNumber">Số máy</label>
                            <input
                                id="machineNumber"
                                {...register('machineNumber')}
                                type="text"
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                        </div>
                    </div>
                    <div className="mb-4 flex justify-between">
                        <div className="flex-1 ml-2">
                            <label htmlFor="category">Loại xe</label>
                            <select
                                id="category"
                                {...register('category')}
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            >
                                <option value={1}>Ghế ngồi</option>
                                <option value={2}>Ghế ngồi limousine</option>
                                <option value={3}>Giường nằm</option>
                                <option value={4}>Giường nằm limousine</option>
                                <option value={5}>Phòng VIP (Cabin)</option>
                            </select>
                        </div>
                        <div className="flex-1 mx-2">
                            <label htmlFor="registrationDeadline">Hạn đăng kiểm</label>
                            <input
                                id="registrationDeadline"
                                {...register('registrationDeadline')}
                                type="date"
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex-1 mx-2">
                            <label htmlFor="insuranceTerm">Hạn bảo hiểm</label>
                            <input
                                id="insuranceTerm"
                                {...register('insuranceTerm')}
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
export default ModalVehicle;