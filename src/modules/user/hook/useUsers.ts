import Toast from "@/lib/toast";
import { useEffect, useState } from "react";
import { getListDriverNameByCompanyId, getListUserByCompanyId } from "../api/userAPI";

const useUsers = (companyId: number | undefined) => {
    const [users, setUsers] = useState<any[]>([]);
    const [driverName, setDriverName] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const fetchUsers = async () => {
        if (!companyId) {
            setLoading(false);
            Toast.error("Lỗi tuy vấn dữ liệu công ty")
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const data = await getListUserByCompanyId(companyId);
            setUsers(data);
        } catch (error) {
            Toast.error("Lỗi hệ thống");
            setError((error as Error).message || "Đã xảy ra lỗi");
        } finally {
            setLoading(false);
        }
    };
    const fetchDriverName = async () => {
        if (!companyId) {
            setLoading(false);
            Toast.error("Lỗi tuy vấn dữ liệu công ty")
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const data = await getListDriverNameByCompanyId(companyId);
            setDriverName(data);
        } catch (error) {
            Toast.error("Lỗi hệ thống");
            setError((error as Error).message || "Đã xảy ra lỗi");
        } finally {
            setLoading(false);
        }
    };
    const fetchData = async () => {
        await fetchUsers();
        await fetchDriverName();
    };
    useEffect(() => {
        fetchData();
    }, [companyId]);

    return { users, driverName, loading, error, setUsers, setDriverName };
}
export default useUsers;