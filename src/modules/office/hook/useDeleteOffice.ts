import { useState } from "react";
import { deleteOfficeById } from "../api/officeAPI";
import Toast from "@/lib/toast";

export const useDeleteOffice = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDeleteOffice = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            await deleteOfficeById(id);
            Toast.success("Xóa văn phòng thành công")
            return true;
        } catch (error) {
            setError((error as Error).message || "Đã xảy ra lỗi");
            Toast.error("Lỗi hệ thống")
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { handleDeleteOffice, loading, error };
}