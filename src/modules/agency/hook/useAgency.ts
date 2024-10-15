import Toast from "@/lib/toast";
import { useEffect, useState } from "react";
import { getListAgencyDetailByCompanyId } from "../api/agencyAPI";

const useAgency = (companyId: number | undefined) => {
    const [agency, setAgency] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAgency = async () => {
            if (!companyId) {
                setLoading(false);
                Toast.error("Lỗi tuy vấn dữ liệu công ty")
                return;
            }
            setLoading(true);
            setError(null);
            try {
                const data = await getListAgencyDetailByCompanyId(companyId);
                setAgency(data);
            } catch (error) {
                Toast.error("Lỗi hệ thống");
                setError((error as Error).message || "Đã xảy ra lỗi");
            } finally {
                setLoading(false);
            }
        };

        fetchAgency();
    }, [companyId]);

    return { agency, loading, error, setAgency };
};

export default useAgency;