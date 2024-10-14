import Toast from "@/lib/toast";
import { useEffect, useState } from "react";
import { getListUserByCompanyId } from "../api/userAPI";

const useUsers = (companyId: number | undefined) => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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
                console.log("Data User from useUsers:", data);
                setUsers(data);
            } catch (error) {
                Toast.error("Lỗi hệ thống");
                setError((error as Error).message || "Đã xảy ra lỗi");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [companyId]);

    return { users, loading, error, setUsers };
}
export default useUsers;