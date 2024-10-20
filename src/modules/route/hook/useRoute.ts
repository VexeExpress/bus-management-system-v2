import Toast from "@/lib/toast";
import { useEffect, useState } from "react";
import { getListRouteActionByCompanyId, getListRouteDetailByCompanyId, getListRouteNameActionByCompanyId } from "../api/routeAPI";

const useRoute = (companyId: number | undefined) => {
    const [route, setRoute] = useState<any[]>([]);
    const [routeNameAction, setRouteNameAction] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
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
            console.log(data);
            setRoute(data);
        } catch (error) {
            Toast.error("Lỗi hệ thống");
            setError((error as Error).message || "Đã xảy ra lỗi");
        } finally {
            setLoading(false);
        }
    };
    const fetchRouteNameAction = async () => {
        if (!companyId) {
            setLoading(false);
            Toast.error("Lỗi tuy vấn dữ liệu công ty")
            return;
        }
        setLoading(true);
        try {
            const data = await getListRouteNameActionByCompanyId(companyId);
            console.log(data);
            setRouteNameAction(data);
        } catch (error) {
            Toast.error("Lỗi hệ thống");
        } finally {
            setLoading(false);
        }
    };
    const fetchData = async () => {
        await fetchRoute();
        await fetchRouteNameAction();
    };
    useEffect(() => {
        fetchData();
    }, [companyId]);

    return { route, routeNameAction, loading, error, setRoute, setRouteNameAction };
};

export default useRoute;