import { RootState } from "@/redux/store";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { VehicleData } from "../types/VehicleData";
import Toast from "@/lib/toast";
import { createVehicle, deleteVehicleById, updateVehicle } from "../api/vehicleAPI";
const useManageVehicles = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const companyId = useSelector((state: RootState) => state.auth.user?.companyId);

    const handleSubmit = useCallback(
        async (data: VehicleData, initialData?: VehicleData, callback?: (vehicle: VehicleData) => void) => {
            setLoading(true);
            setError(null);
            try {
                let vehicle;
                if (initialData) {
                    vehicle = await updateVehicle(initialData.id, data, companyId);
                    console.log("Updated data:", vehicle);
                    Toast.info("Cập nhật phương tiện thành công!");
                } else {
                    vehicle = await createVehicle(companyId, data);
                    console.log("Created data:", vehicle);
                    Toast.success("Thêm phương tiện thành công!");
                }
                if (callback) {
                    callback(vehicle);
                }
                return vehicle;
            } catch (error: any) {
                if (error.response) {
                    const statusCode = error.response.status;
                    if (statusCode === 400) {
                        Toast.error("Phương tiện đã tồn tại");
                        setError("Phương tiện đã tồn tại");
                    } else if (statusCode === 404) {
                        Toast.error("Phương tiện đã tồn tại");
                        setError("Phương tiện đã tồn tại");
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

    const handleDeleteVehicle = useCallback(
        async (id: number) => {
            setLoading(true);
            setError(null);
            try {
                await deleteVehicleById(id);
                Toast.success("Xóa phương tiện thành công");
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

    return { loading, error, handleSubmit, handleDeleteVehicle };
};

export default useManageVehicles;