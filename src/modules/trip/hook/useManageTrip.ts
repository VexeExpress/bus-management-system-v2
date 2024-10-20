import { useState } from "react";
import { TripData } from "../types/TripData";
import Toast from "@/lib/toast";
import { createTrip } from "../api/tripAPI";

const useManageTrip = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleAdd = async (newData: TripData) => {
        setLoading(true);
        setError(null);
        try {
            console.log("Data: " + JSON.stringify(newData));
            const newTrip = await createTrip(newData);
            console.log("Trip added: " + JSON.stringify(newTrip));
            Toast.success("Tạo chuyến thành công");
        } catch (error: any) {
            console.error('Error creating trip:', error.message);
            setError(error.message);
            Toast.error("Có lỗi xảy ra khi tạo chuyến");
        } finally {
            setLoading(false);
        }
    };

    return { handleAdd, loading, error };
};

export default useManageTrip;