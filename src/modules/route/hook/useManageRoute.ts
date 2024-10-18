import Toast from "@/lib/toast";
import { RootState } from "@/redux/store";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { RouteData } from "../types/RouteData";
import { createRoute, deleteRouteById, updateRoute } from "../api/routeAPI";

const useManageRoute = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const companyId = useSelector((state: RootState) => state.auth.user?.companyId);

    const handleSubmit = useCallback(
        async (data: RouteData, initialData?: RouteData, callback?: (route: RouteData) => void) => {
            setLoading(true);
            setError(null);
            try {
                let route;
                if (initialData) {
                    route = await updateRoute(initialData.id, data, companyId);
                    console.log("Updated data:", route);
                    Toast.info("Cập nhật tuyến thành công!");
                } else {
                    route = await createRoute(companyId, data);
                    console.log("Created data:", route);
                    Toast.success("Thêm tuyến thành công!");
                }
                if (callback) {
                    callback(route);
                }
                return route;
            } catch (error: any) {
                if (error.response) {
                    const statusCode = error.response.status;
                    if (statusCode === 400) {
                        Toast.error("Tuyến đã tồn tại");
                        setError("Tuyến đã tồn tại");
                    } else if (statusCode === 404) {
                        Toast.error("Tuyến đã tồn tại");
                        setError("Tuyến đã tồn tại");
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

    const handleDeleteRoute = useCallback(
        async (id: number) => {
            setLoading(true);
            setError(null);
            try {
                await deleteRouteById(id);
                Toast.success("Xóa tuyến thành công");
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

    return { loading, error, handleSubmit, handleDeleteRoute };
};

export default useManageRoute;