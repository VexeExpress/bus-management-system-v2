import { RootState } from "@/redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { UserData } from "../types/UserData";
import Toast from "@/lib/toast";
import { createUser, updateUser } from "../api/userAPI";

const useManageUsers = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const companyId = useSelector((state: RootState) => state.auth.user?.companyId);
    const handleSubmit = async (data: UserData, initialData?: UserData, callback?: (office: UserData) => void) => {
        setLoading(true);
        setError(null);
        try {
            console.log("initialData: ", initialData);
            let user;
            if (initialData) {
                user = await updateUser(initialData.id, data);
                console.log("Updated data:", user);
                Toast.info("Cập nhật thông tin nhân viên thành công!");
            } else {
                user = await createUser(companyId, data);
                console.log("Created data:", user);
                Toast.success("Thêm nhân viên thành công!");
            }
            if (callback) {
                callback(user);
            }
            return user;
        } catch (error: any) {
            console.error("Error during submit:", error);
            if (error.response) {
                const statusCode = error.response.status;
                if (statusCode === 400) {
                    Toast.error("Tài khoản nhân viên đã tồn tại");
                    setError("Tài khoản nhân viên đã tồn tại");
                } else if (statusCode === 500) {
                    Toast.error("Lỗi hệ thống. Vui lòng thử lại sau!");
                    setError("Lỗi hệ thống. Vui lòng thử lại sau!");
                } else {
                    Toast.error('Lỗi hệ thống. Vui lòng thử lại sau!');
                    setError("Lỗi hệ thống. Vui lòng thử lại sau!");
                }
            } else {
                Toast.error("Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.");
                setError("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
            }
        } finally {
            setLoading(false);
        }
    };
    return { loading, error, handleSubmit };
}
export default useManageUsers;