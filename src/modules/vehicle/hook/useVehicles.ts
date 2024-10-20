import Toast from "@/lib/toast";
import { useEffect, useState } from "react";
import { getListVehicleDetailByCompanyId, getListVehicleNameByCompanyId } from "../api/vehicleAPI";

const useVehicles = (companyId: number | undefined) => {
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [vehicleName, setVehicleName] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const fetchVehicles = async () => {
        if (!companyId) {
            setLoading(false);
            Toast.error("Lỗi tuy vấn dữ liệu công ty")
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await getListVehicleDetailByCompanyId(companyId);
            setVehicles(data);
        } catch (error) {
            Toast.error("Lỗi hệ thống");
            setError((error as Error).message || "Đã xảy ra lỗi");
        } finally {
            setLoading(false);
        }
    };
    const fetchVehicleName = async () => {
        if (!companyId) {
            setLoading(false);
            Toast.error("Lỗi tuy vấn dữ liệu công ty")
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await getListVehicleNameByCompanyId(companyId);
            setVehicleName(data);
        } catch (error) {
            Toast.error("Lỗi hệ thống");
            setError((error as Error).message || "Đã xảy ra lỗi");
        } finally {
            setLoading(false);
        }
    };
    const fetchData = async () => {
        await fetchVehicles();
        await fetchVehicleName();
    };
    useEffect(() => {
        fetchData();

    }, [companyId]);

    return { vehicles, vehicleName, loading, error, setVehicles, setVehicleName };
};

export default useVehicles;