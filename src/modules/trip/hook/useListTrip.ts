import { useEffect, useState } from "react";
import { getListTrip } from "../api/tripAPI";

const useListTrip = (companyId: number, formattedDateTrip: string, selectedRouteId: number) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [trips, setTrips] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchTrips = async () => {
        setLoading(true);
        try {
            const data = await getListTrip(companyId, formattedDateTrip, selectedRouteId);
            console.log("Data Trip: ", data);
            setTrips(data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (companyId && formattedDateTrip && selectedRouteId) {
            fetchTrips();
        }
    }, [companyId, formattedDateTrip, selectedRouteId]);

    return { loading, trips, error, refetch: fetchTrips };
};

export default useListTrip;