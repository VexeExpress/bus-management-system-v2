export interface Trip {
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
export interface TripItem {
    id: number;
    time: string;
    seatMapName: string;
    user: string[];
    vehicle: string;
}
