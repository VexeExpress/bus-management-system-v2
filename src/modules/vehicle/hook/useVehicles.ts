import Toast from "@/lib/toast";
import { useEffect, useState } from "react";
import { getListVehicleDetailByCompanyId } from "../api/vehicleAPI";

const useVehicles = (companyId: number | undefined) => {
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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

        fetchVehicles();
    }, [companyId]);

    return { vehicles, loading, error, setVehicles };
};

export default useVehicles;