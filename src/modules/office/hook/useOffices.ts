import Toast from "@/lib/toast";
import { useEffect, useState } from "react";
import { getListOfficeDetailByCompanyId } from "../api/officeAPI";

const useOffices = (companyId: number | undefined) => {
    const [offices, setOffices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOffices = async () => {
            if (!companyId) {
                setLoading(false);
                console.log("No companyId provided.");
                Toast.error("Lỗi tuy vấn dữ liệu công ty")
                return;
            }
            setLoading(true);
            setError(null);
            
            try {
                const data = await getListOfficeDetailByCompanyId(companyId);
                setOffices(data);
                console.log("Data Office from useOffice:", data);
            } catch (error) {
                Toast.error("Lỗi hệ thống");
                setError((error as Error).message || "Đã xảy ra lỗi");
                console.error("Error fetching offices:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOffices();
    }, [companyId]);

    return { offices, loading, error, setOffices };
};

export default useOffices;