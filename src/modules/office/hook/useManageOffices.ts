import { useState } from "react";
import { OfficeData } from "../types/OfficeData";
import { createOffice, updateOffice } from "../api/officeAPI";
import Toast from "@/lib/toast";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const useManageOffices = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const companyId = useSelector((state: RootState) => state.auth.user?.companyId);
    const handleSubmit = async (data: OfficeData, initialData?: OfficeData, callback?: (office: OfficeData) => void) => {
        setLoading(true);
        setError(null);
        try {
            console.log("initialData: ", initialData);
            let office;
            if (initialData) {
                office = await updateOffice(initialData.id, data);
                console.log("Updated data:", office);
                Toast.info("Cập nhật văn phòng thành công!");
            } else {
                office = await createOffice(companyId, data);
                console.log("Created data:", office);
                Toast.success("Thêm văn phòng thành công!");
            }
            if (callback) {
                callback(office);
            }
            return office;
        } catch (error: any) {
            console.error("Error during submit:", error);
            if (error.response) {
                const statusCode = error.response.status;
                if (statusCode === 400) {
                    Toast.error("Văn phòng đã tồn tại");
                    setError("Văn phòng đã tồn tại");
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
};
export default useManageOffices;
