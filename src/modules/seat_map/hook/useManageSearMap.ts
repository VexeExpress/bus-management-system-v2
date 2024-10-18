import { RootState } from "@/redux/store";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { SeatMapData } from "../types/SeatMapData";
import Toast from "@/lib/toast";
import { createSeatMap, deleteSeatMapById, updateSeatMap } from "../api/seatMapAPI";

const useManageSeatMap = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const companyId = useSelector((state: RootState) => state.auth.user?.companyId);
    const handleSubmit = useCallback(
        async (data: SeatMapData, initialData?: SeatMapData, callback?: (seatMap: SeatMapData) => void) => {
            setLoading(true);
            setError(null);
            try {
                let seatMap;
                if (initialData) {
                    seatMap = await updateSeatMap(initialData.id, data, companyId);
                    console.log("Updated data:", seatMap);
                    Toast.info("Cập nhật sơ đồ ghế thành công!");
                } else {
                    seatMap = await createSeatMap(companyId, data);
                    console.log("Created data:", seatMap);
                    Toast.success("Thêm sơ đồ ghế thành công!");
                }
                if (callback) {
                    callback(seatMap);
                }
                return seatMap;
            } catch (error: any) {
                if (error.response) {
                    const statusCode = error.response.status;
                    if (statusCode === 400) {
                        Toast.error("Sơ đồ ghế đã tồn tại");
                        setError("Sơ đồ ghế đã tồn tại");
                    } else if (statusCode === 404) {
                        Toast.error("Sơ đồ ghế đã tồn tại");
                        setError("Sơ đồ ghế đã tồn tại");
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
    const handleDeleteSeatMap = useCallback(
        async (id: number) => {
            setLoading(true);
            setError(null);
            try {
                await deleteSeatMapById(id);
                Toast.success("Xóa sơ đồ ghế thành công");
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
    return { loading, error, handleSubmit, handleDeleteSeatMap };
}
export default useManageSeatMap;