import Toast from "@/lib/toast";
import { useEffect, useState } from "react";
import { fetchTicketData } from "../api/ticketAPI";

const useTicketData = (selectedItemId: number | null) => {
    const [ticketData, setTicketData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getTicketData = async () => {
        try {
            if (!selectedItemId) return;
            setLoading(true);
            const data = await fetchTicketData(selectedItemId);
            setTicketData(data);
        } catch (err) {
            Toast.error("Không thể tải sơ đồ ghế");
            setError('Không thể tải sơ đồ ghế.');
            setTicketData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTicketData();
    }, [selectedItemId]);

    return { ticketData, loading, error };
};

export default useTicketData;