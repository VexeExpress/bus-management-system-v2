import Toast from "@/lib/toast";
import { Agency } from "@/types/Agency";
import { useEffect, useState } from "react";

const useAgencies = () => {
    const [agencies, setAgencies] = useState<Agency[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const fetchAgencies = async () => {
        setLoading(true);
        try {
            // Giả lập fetch dữ liệu từ API
            const response = await new Promise<Agency[]>((resolve) =>
                setTimeout(() => {
                    resolve([
                        { id: 1, name: 'Chi nhánh A', phone: '0123456789', address: 'Địa chỉ A', note: 'Ghi chú A' },
                        { id: 2, name: 'Chi nhánh B', phone: '0987654321', address: 'Địa chỉ B', note: 'Ghi chú B'},
                        { id: 3, name: 'Chi nhánh C', phone: '0112233445', address: 'Địa chỉ C', note: 'Ghi chú C' },
                    ]);
                }, 500)
            );
            setAgencies(response);
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };
    const addAgency = (newAgency: Agency) => {
        setAgencies(prevAgencies => [...prevAgencies, { ...newAgency, id: prevAgencies.length + 1 }]);
        Toast.success("Đại lý đã được thêm thành công!");
    };

    const updateAgency = (updatedAgency: Agency) => {
        setAgencies(prevAgencies =>
            prevAgencies.map(item => (item.id === updatedAgency.id ? updatedAgency : item))
        );
        Toast.success("Đại lý đã được cập nhật thành công!");
    };

    const deleteAgency = (id: number) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa đại lý này?")) {
            setAgencies(prevAgencies => prevAgencies.filter(item => item.id !== id));
            Toast.success("Đại lý đã được xóa thành công!");
        }
    };

    useEffect(() => {
        fetchAgencies();
    }, []);

    return {
        agencies,
        loading,
        error,
        addAgency,
        updateAgency,
        deleteAgency,
    };
}
export default useAgencies;