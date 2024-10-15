'use client';


import LoadingIndicator from "@/lib/loading";
import ModalAgency from "@/modules/agency/components/ModalAgency";
import TableAgency from "@/modules/agency/components/TableAgency";
import useAgency from "@/modules/agency/hook/useAgency";
import useManageAgency from "@/modules/agency/hook/useManageAgency";
import { AgencyData } from "@/modules/agency/types/AgencyData";
import { RootState } from "@/redux/store";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function AgencyPage() {
    const headers = ['STT', 'Tên đại lý', 'Điện thoại', 'Địa chỉ', 'Email', 'Cấp đại lý', 'Ngày tạo', 'Ghi chú', 'Tùy chọn'];
    const companyId = useSelector((state: RootState) => state.auth.user?.companyId);
    const [open, setOpen] = useState(false);
    const [initialData, setInitialData] = useState<AgencyData | null>(null);
    const { agency, loading, error, setAgency } = useAgency(companyId);
    const handleOpen = () => {
        setInitialData(null);
        setOpen(true);
    };
    const handleEdit = (levelAgency: AgencyData) => {
        setInitialData(levelAgency);
        setOpen(true);
    };
    const { handleSubmit } = useManageAgency();
    const handleFormSubmit = async (data: AgencyData) => {
        await handleSubmit(data, initialData ?? undefined, (agency: AgencyData) => {
            if (initialData) {
                setAgency((prevData) =>
                    prevData.map((o) => (o.id === agency.id ? agency : o))
                );
            } else {
                setAgency((prevData) => [...prevData, agency]);
            }
        });
    };
    const { handleDeleteAgency } = useManageAgency();
    const handleDelete = async (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn đại lý này không?")) {
            const success = await handleDeleteAgency(id);
            if (success) {
                setAgency((prevData) => prevData.filter(agency => agency.id !== id));
            }
        }
    };
    if (loading) return <><LoadingIndicator /></>;
    if (error) return <div>{error}</div>;
    return (
        <div className="p-0">
            <div className="flex justify-between items-center mb-2 p-2">
            <span className="m-0 font-rounded font-semibold text-[20px]">DANH SÁCH ĐẠI LÝ</span>
                <Button variant="contained" startIcon={<Add />} onClick={handleOpen}>
                    Thêm đại lý
                </Button>
            </div>
            <TableAgency headers={headers} data={agency} onEdit={handleEdit} onDelete={handleDelete}/>
            <ModalAgency open={open} onClose={() => setOpen(false)} onSubmit={handleFormSubmit} initialData={initialData} companyId={companyId ?? 0}/>
        </div>
    )
}