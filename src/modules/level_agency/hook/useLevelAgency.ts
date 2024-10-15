import Toast from "@/lib/toast";
import { useEffect, useState } from "react";
import { getListLevelAgencyDetailByCompanyId } from "../api/levelAgencyAPI";

const useLevelAgency = (companyId: number | undefined) => {
    const [levelAgency, setLevelAgency] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLevelAgency = async () => {
            if (!companyId) {
                setLoading(false);
                Toast.error("Lỗi tuy vấn dữ liệu công ty")
                return;
            }
            setLoading(true);
            setError(null);
            try {
                const data = await getListLevelAgencyDetailByCompanyId(companyId);
                setLevelAgency(data);
            } catch (error) {
                Toast.error("Lỗi hệ thống");
                setError((error as Error).message || "Đã xảy ra lỗi");
            } finally {
                setLoading(false);
            }
        };

        fetchLevelAgency();
    }, [companyId]);

    return { levelAgency, loading, error, setLevelAgency };
};

export default useLevelAgency;