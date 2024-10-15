import { RootState } from "@/redux/store";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { AgencyData } from "../types/AgencyData";
import Toast from "@/lib/toast";
import { createAgency, deleteAgencyById, updateAgency } from "../api/agencyAPI";

const useManageAgency = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const companyId = useSelector((state: RootState) => state.auth.user?.companyId);
    const handleSubmit = useCallback(
        async (data: AgencyData, initialData?: AgencyData, callback?: (agency: AgencyData) => void) => {
            setLoading(true);
            setError(null);
            try {
                let agency;
                if (initialData) {
                    agency = await updateAgency(initialData.id, data, companyId);
                    console.log("Updated data:", agency);
                    Toast.info("Cập nhật đại lý thành công!");
                } else {
                    agency = await createAgency(companyId, data);
                    console.log("Created data:", agency);
                    Toast.success("Thêm đại lý thành công!");
                }
                if (callback) {
                    callback(agency);
                }
                return agency;
            } catch (error: any) {
                if (error.response) {
                    const statusCode = error.response.status;
                    if (statusCode === 400) {
                        Toast.error("Đại lý đã tồn tại");
                        setError("Đại lý đã tồn tại");
                    } else if (statusCode === 404) {
                        Toast.error("Đại lý đã tồn tại");
                        setError("Đại lý đã tồn tại");
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
    const handleDeleteAgency = useCallback(
        async (id: number) => {
            setLoading(true);
            setError(null);
            try {
                await deleteAgencyById(id);
                Toast.success("Xóa đại lý thành công");
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
    return { loading, error, handleSubmit, handleDeleteAgency };
}
export default useManageAgency;