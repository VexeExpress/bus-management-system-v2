import Toast from "@/lib/toast";
import { useEffect, useState } from "react";
import { getListRouteDetailByCompanyId } from "../api/routeAPI";

const useRoute = (companyId: number | undefined) => {
    const [route, setRoute] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRoute = async () => {
            if (!companyId) {
                setLoading(false);
                Toast.error("Lỗi tuy vấn dữ liệu công ty")
                return;
            }
            setLoading(true);
            setError(null);
            try {
                const data = await getListRouteDetailByCompanyId(companyId);
                setRoute(data);
            } catch (error) {
                Toast.error("Lỗi hệ thống");
                setError((error as Error).message || "Đã xảy ra lỗi");
            } finally {
                setLoading(false);
            }
        };

        fetchRoute();
    }, [companyId]);

    return { route, loading, error, setRoute };
};

export default useRoute;