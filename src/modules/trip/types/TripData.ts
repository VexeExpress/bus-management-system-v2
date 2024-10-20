export interface TripData {
    id: number | null;
    routeId: number;
    dateTrip: string;
    vehicleId: number | null;
    userId: number[];
    seatMapId: number;
    time: string;
    note: string;
    companyId: number;
}