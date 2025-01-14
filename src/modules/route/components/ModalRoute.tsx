import { useForm } from "react-hook-form";
import { RouteData } from "../types/RouteData";
import { useEffect } from "react";
import { Box, Button, Modal } from "@mui/material";

interface ModalRouteProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: RouteData, initialData?: RouteData) => void;
    initialData: RouteData | null;
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
const ModalRoute: React.FC<ModalRouteProps> = ({ open, onClose, onSubmit, initialData }) => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<RouteData>({
        mode: "onTouched",
    });
    useEffect(() => {
        if (open) {
            console.log("Modal opened. Initial data:", initialData);
            if (initialData) {
                setValue('routeName', initialData.routeName || '')
                setValue('routeNameShort', initialData.routeNameShort || '')
                setValue('displayPrice', initialData.displayPrice || 0)
                setValue('note', initialData.note || '')
                setValue('status', initialData?.status === true)
            } else {
                reset();
            }
        }
    }, [open, initialData, setValue, reset]);
    const handleClose = () => {
        reset();
        onClose();
    };
    const onSubmitForm = (data: RouteData) => {
        onSubmit(data, initialData ?? undefined);
        handleClose();
    };
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <span className="text-[20px] text-blue-500">
                    {initialData ? "Cập nhật thông tin tuyến" : "Thêm tuyến mới"}
                </span>
                <form onSubmit={handleSubmit(onSubmitForm)} className="mt-5">

                    <div className="flex-1">
                        <label htmlFor="routeName">Tên tuyến</label>
                        <input
                            id="routeName"
                            {...register('routeName', { required: "*Vui lòng nhập tên tuyến" })}
                            type="text"
                            className="w-full p-2 mt-1 border border-gray-300 rounded"
                        />
                        {errors.routeName && <p className="text-red-500 text-[13px]">{errors.routeName.message}</p>}
                    </div>
                    <div className="flex-1 ">
                        <label htmlFor="routeNameShort">Tên tuyến rút gọn</label>
                        <input
                            id="routeNameShort"
                            {...register('routeNameShort', { required: "*Vui lòng nhập tên tuyến rút gọn" })}
                            type="text"
                            className="w-full p-2 mt-1 border border-gray-300 rounded"
                        />
                        {errors.routeNameShort && <p className="text-red-500 text-[13px]">{errors.routeNameShort.message}</p>}
                    </div>
                    <div className="flex-1">
                        <label htmlFor="displayPrice">Giá cơ bản</label>
                        <input
                            id="displayPrice"
                            {...register('displayPrice', { required: "*Vui lòng nhập giá cơ bản" })}
                            type="number"
                            className="w-full p-2 mt-1 border border-gray-300 rounded"
                        />
                        {errors.displayPrice && <p className="text-red-500 text-[13px]">{errors.displayPrice.message}</p>}
                    </div>
                    <div className="flex-1 ">
                        <label htmlFor="note">Ghi chú</label>
                        <input
                            id="note"
                            {...register('note')}
                            type="text"
                            className="w-full p-2 mt-1 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex-1 ">
                        <label htmlFor="status">Trạng thái</label>
                        <select
                            id="status"
                            {...register('status')}
                            className="w-full p-2 mt-1 border border-gray-300 rounded"
                        >
                            <option value="true">Kích hoạt</option>
                            <option value="false">Ngưng kích hoạt</option>
                            
                        </select>
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
export default ModalRoute;