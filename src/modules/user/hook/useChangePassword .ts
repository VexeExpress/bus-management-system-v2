import { useState } from "react";
import { changePassUser } from "../api/userAPI";
import Toast from "@/lib/toast";

const useChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChangePassword = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            await changePassUser(id);
            Toast.success("Mật khẩu đã được thay đổi thành công!");
        } catch (err) {
            console.error("Error changing password:", err);
            Toast.error("Có lỗi xảy ra khi thay đổi mật khẩu.");
            setError("Có lỗi xảy ra khi thay đổi mật khẩu.");
        } finally {
            setLoading(false);
        }
    };

    return { handleChangePassword, loading, error };
};

export default useChangePassword;