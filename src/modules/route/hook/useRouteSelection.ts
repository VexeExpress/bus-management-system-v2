import Toast from "@/lib/toast";
import { useEffect, useState } from "react";
import { getListRouteActionByCompanyId } from "../api/routeAPI";

const useRouteSelection = (companyId: number | undefined) => {
    const [route, setRoute] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoute = async () => {
            if (!companyId) {
                setLoading(false);
                Toast.error("Lỗi tuy vấn dữ liệu công ty")
                return;
            }
            setLoading(true);
            try {
                const data = await getListRouteActionByCompanyId(companyId);
                console.log(data);
                setRoute(data);
            } catch (error) {
                Toast.error("Lỗi hệ thống");
            } finally {
                setLoading(false);
            }
        };

        fetchRoute();
    }, [companyId]);

    return { route, loading, setRoute };
};

export default useRouteSelection;