import { useForm } from "react-hook-form";
import { AgencyData } from "../types/AgencyData";
import { useEffect, useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { LevelAgency } from "@/types/LevelAgency";
import { getListLevelAgencyDetailByCompanyId } from "@/modules/level_agency/api/levelAgencyAPI";

interface ModalAgencyProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: AgencyData, initialData?: AgencyData) => void;
    initialData: AgencyData | null;
    companyId: number;
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
const ModalAgency: React.FC<ModalAgencyProps> = ({ open, onClose, onSubmit, initialData, companyId }) => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<AgencyData>({
        mode: "onTouched",
    });
    const [levelAgencies, setLevelAgencies] = useState<LevelAgency[]>([]);
    useEffect(() => {
        if (open) {
            console.log("Modal opened. Initial data:", initialData);
            if (initialData) {
                setValue('name', initialData.name || '');
                setValue('phone', initialData.phone || '');
                setValue('address', initialData.address || '');
                setValue('email', initialData.email || '');
                setValue('note', initialData.note || '');
                setValue('levelAgencyId', initialData.levelAgencyId || 0);

            } else {
                reset();
            }
            fetchLevelAgencies(companyId);
        }
    }, [open, initialData, setValue, reset]);
    const fetchLevelAgencies = async (companyId: number) => {
        try {
            const data = await getListLevelAgencyDetailByCompanyId(companyId);
            setLevelAgencies(data);
        } catch (error) {
            console.error("Failed to fetch level agencies:", error);
        }
    };
    const handleClose = () => {
        reset();
        onClose();
    };
    const onSubmitForm = (data: AgencyData) => {
        onSubmit(data, initialData ?? undefined);
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <span className="text-[20px] text-blue-500">
                    {initialData ? "Cập nhật thông tin đại lý" : "Thêm đại lý mới"}
                </span>
                <form onSubmit={handleSubmit(onSubmitForm)} className="mt-5">
                    <div className="mb-4 flex justify-between">
                        <div className="flex-1 mr-2">
                            <label htmlFor="name">Tên đại lý</label>
                            <input
                                id="name"
                                {...register('name', { required: "*Vui lòng nhập tên đại lý" })}
                                type="text"
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                            {errors.name && <p className="text-red-500 text-[13px]">{errors.name.message}</p>}
                        </div>
                        <div className="flex-1 mr-2">
                            <label htmlFor="phone">Số điện thoại</label>
                            <input
                                id="quota"
                                {...register('phone', { required: "*Vui lòng nhập số điện thoại" })}
                                type="text"
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                            {errors.phone && <p className="text-red-500 text-[13px]">{errors.phone.message}</p>}
                        </div>
                        <div className="flex-1 mr-2">
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
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                {...register('email')}
                                type="text"
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex-1 mr-2">
                            <label htmlFor="note">Ghi chú</label>
                            <input
                                id="note"
                                {...register('note')}
                                type="text"
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex-1 mr-2">
                            <label htmlFor="levelAgencyId">Cấp đại lý</label>
                            <select
                                id="levelAgencyId"
                                {...register('levelAgencyId')}
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            >
                                {levelAgencies.map((agency) => (
                                    <option key={agency.id} value={agency.id}>
                                        {agency.levelName}
                                    </option>
                                ))}
                            </select>
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
export default ModalAgency;