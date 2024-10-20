import Toast from "@/lib/toast";
import { useEffect, useState } from "react";
import { getListSeatMapDetailByCompanyId, getListSeatMapNameByCompanyId } from "../api/seatMapAPI";

const useSeatMap = (companyId: number | undefined) => {
    const [seatMap, setSeatMap] = useState<any[]>([]);
    const [seatMapsName, setSeatMapsName] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
            console.log(data);
            setSeatMap(data);
        } catch (error) {
            Toast.error("Lỗi hệ thống");
        } finally {
            setLoading(false);
        }
    };
    const fetchSeatMapName = async () => {
        if (!companyId) {
            setLoading(false);
            Toast.error("Lỗi tuy vấn dữ liệu công ty")
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await getListSeatMapNameByCompanyId(companyId);
            console.log(data);
            setSeatMapsName(data);
        } catch (error) {
            Toast.error("Lỗi hệ thống");
        } finally {
            setLoading(false);
        }
    };



    const fetchData = async () => {
        await fetchSeatMap();
        await fetchSeatMapName();
    };
    useEffect(() => {
        fetchData();
    }, [companyId]);

    return { seatMap, seatMapsName, loading, error, setSeatMap, setSeatMapsName  };
};

export default useSeatMap;