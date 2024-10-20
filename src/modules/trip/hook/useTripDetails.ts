import { useEffect, useState } from "react";
import { fetchTripDetails } from "../api/tripAPI";
import { TripDetails } from "../types/TripDetails";

const useTripDetails = (selectedItemId: number | null) => {
    const [tripDetails, setTripDetails] = useState<TripDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTripDetailsById = async (id: number) => {
        if (id === null) return;
        setLoading(true);
        setError(null);
        try {
            const data = await fetchTripDetails(id);
            console.log("Data Trip Detail: ", data);
            setTripDetails(data);
        } catch (error) {
            console.error('Error fetching trip details:', error);
            setError('Failed to fetch trip details.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedItemId) {
            fetchTripDetailsById(selectedItemId);
        }
    }, [selectedItemId]);

    return { tripDetails, loading, error };
};

export default useTripDetails;