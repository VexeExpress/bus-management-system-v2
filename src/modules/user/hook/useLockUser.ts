import Toast from "@/lib/toast";
import { useState } from "react";
import { UserData } from "../types/UserData";
import { lockUser } from "../api/userAPI";

const useLockUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLockUser = async (userData: { id: number; status: boolean }, undefined: undefined, callback: (user: UserData) => void) => {
        setLoading(true);
        setError(null);
        try {
            const user = await lockUser(userData.id);
            Toast.success("Khóa tài khoản thành công");

            callback(user);
            return user;
        } catch (err) {
            console.error(err);
            Toast.error("Có lỗi xảy ra khi khóa tài khoản");
            setError('Có lỗi xảy ra khi khóa người dùng.');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { handleLockUser, loading, error };
};

export default useLockUser;