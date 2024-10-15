import { RootState } from "@/redux/store";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { LevelAgencyData } from "../types/LevelAgencyData";
import Toast from "@/lib/toast";
import { createLevelAgency, deleteLevelAgencyById, updateLevelAgency } from "../api/levelAgencyAPI";

const useManageLevelAgency = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const companyId = useSelector((state: RootState) => state.auth.user?.companyId);
    const handleSubmit = useCallback(
        async (data: LevelAgencyData, initialData?: LevelAgencyData, callback?: (levelAgency: LevelAgencyData) => void) => {
            setLoading(true);
            setError(null);
            try {
                let levelAgency;
                if (initialData) {
                    levelAgency = await updateLevelAgency(initialData.id, data, companyId);
                    console.log("Updated data:", levelAgency);
                    Toast.info("Cập nhật cấp đại lý thành công!");
                } else {
                    levelAgency = await createLevelAgency(companyId, data);
                    console.log("Created data:", levelAgency);
                    Toast.success("Thêm cấp đại lý thành công!");
                }
                if (callback) {
                    callback(levelAgency);
                }
                return levelAgency;
            } catch (error: any) {
                if (error.response) {
                    const statusCode = error.response.status;
                    if (statusCode === 400) {
                        Toast.error("Cấp đại lý đã tồn tại");
                        setError("Cấp đại lý đã tồn tại");
                    } else if (statusCode === 404) {
                        Toast.error("Cấp đại lý đã tồn tại");
                        setError("Cấp đại lý đã tồn tại");
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
        },
        [companyId]
    );
    const handleDeleteLevelAgency = useCallback(
        async (id: number) => {
            setLoading(true);
            setError(null);
            try {
                await deleteLevelAgencyById(id);
                Toast.success("Xóa cấp đại lý thành công");
                return true;
            } catch (error) {
                setError((error as Error).message || "Đã xảy ra lỗi");
                Toast.error("Lỗi hệ thống");
                return false;
            } finally {
                setLoading(false);
            }
        },
        []
    );
    return { loading, error, handleSubmit, handleDeleteLevelAgency };
}
export default useManageLevelAgency;