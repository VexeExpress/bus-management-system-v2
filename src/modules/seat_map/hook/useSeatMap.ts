import Toast from "@/lib/toast";
import { useEffect, useState } from "react";
import { getListSeatMapDetailByCompanyId } from "../api/seatMapAPI";

const useSeatMap = (companyId: number | undefined) => {
    const [seatMap, setSeatMap] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSeatMap = async () => {
            if (!companyId) {
                setLoading(false);
                Toast.error("Lỗi tuy vấn dữ liệu công ty")
                return;
            }
            setLoading(true);
            setError(null);
            try {
                const data = await getListSeatMapDetailByCompanyId(companyId);
                console.log(data)
                setSeatMap(data);
            } catch (error) {
                Toast.error("Lỗi hệ thống");
                setError((error as Error).message || "Đã xảy ra lỗi");
            } finally {
                setLoading(false);
            }
        };

        fetchSeatMap();
    }, [companyId]);

    return { seatMap, loading, error, setSeatMap };
};

export default useSeatMap;