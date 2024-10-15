import Toast from "@/lib/toast";
import { useState } from "react";
import { deleteUserById } from "../api/userAPI";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export const useDeleteUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const currentUserId = useSelector((state: RootState) => state.auth.user?.id);
    const handleDeleteUser = async (id: number) => {
        if (currentUserId === id) {
            Toast.error("Bạn không thể xóa chính mình.");
            return false;
        }
        setLoading(true);
        setError(null);
        try {
            await deleteUserById(id);
            Toast.success("Xóa nhân viên thành công")
            return true;
        } catch (error) {
            setError((error as Error).message || "Đã xảy ra lỗi");
            Toast.error("Lỗi hệ thống")
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { handleDeleteUser, loading, error };
}