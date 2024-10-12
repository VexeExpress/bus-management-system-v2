import { useEffect, useState } from "react";
import { SelectData } from "../types/SelectData";
import { getListOfficeByCompanyId } from '../api/officeAPI';
import Toast from "@/lib/toast";

const useOffices = (companyId: number | undefined) => {
    const [offices, setOffices] = useState<SelectData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchOffices = async () => {
            console.log("Fetching offices for companyId:", companyId);
            if (!companyId) {
                setLoading(false);
                console.log("No companyId provided.");
                Toast.error("Lỗi tuy vấn dữ liệu công ty")
                return;
            }

            setLoading(true);
            setError(null);
            console.log("Loading started...");

            try {
                const response = await getListOfficeByCompanyId(companyId);
                setOffices(response || []);
                console.log("Data Office: ", response);
            } catch (err) {
                Toast.error("Lỗi hệ thống")
                console.error("Error fetching offices:", err);
                setError(err as Error);
            } finally {
                setLoading(false);
                console.log("Loading finished.");
            }
        };

        fetchOffices();
    }, [companyId]);
    return { offices, loading, error };
}
export default useOffices;