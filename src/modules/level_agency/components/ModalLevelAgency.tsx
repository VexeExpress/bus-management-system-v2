import { Box, Button, Modal } from "@mui/material";
import { LevelAgencyData } from "../types/LevelAgencyData";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

interface ModalLevelAgencyProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: LevelAgencyData, initialData?: LevelAgencyData) => void;
    initialData: LevelAgencyData | null;
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
const ModalLevelAgency: React.FC<ModalLevelAgencyProps> = ({ open, onClose, onSubmit, initialData }) => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<LevelAgencyData>({
        mode: "onTouched",
    });
    useEffect(() => {
        if (open) {
            console.log("Modal opened. Initial data:", initialData);
            if (initialData) {
                setValue('levelName', initialData.levelName || '');
                setValue('quota', initialData.quota || 0);

            } else {
                reset();
            }
        }
    }, [open, initialData, setValue, reset]);
    const handleClose = () => {
        reset();
        onClose();
    };
    const onSubmitForm = (data: LevelAgencyData) => {
        onSubmit(data, initialData ?? undefined);
        handleClose();
    };
    
    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <span className="text-[20px] text-blue-500">
                    {initialData ? "Cập nhật thông tin cấp đại lý" : "Thêm cấp đại lý mới"}
                </span>
                <form onSubmit={handleSubmit(onSubmitForm)} className="mt-5">
                    <div className="flex-1 mr-2">
                        <label htmlFor="levelName">Cấp đại lý</label>
                        <input
                            id="levelName"
                            {...register('levelName', { required: "*Vui lòng nhập cấp đại lý" })}
                            type="text"
                            className="w-full p-2 mt-1 border border-gray-300 rounded"
                        />
                        {errors.levelName && <p className="text-red-500 text-[13px]">{errors.levelName.message}</p>}
                    </div>
                    <div className="flex-1 mr-2">
                        <label htmlFor="levelName">Định mức</label>
                        <input
                            id="quota"
                            {...register('quota', { required: "*Vui lòng nhập định mức" })}
                            type="text"
                            className="w-full p-2 mt-1 border border-gray-300 rounded"
                        />
                        {errors.quota && <p className="text-red-500 text-[13px]">{errors.quota.message}</p>}
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
export default ModalLevelAgency;