import { SeatData } from "./SeatData";

export interface SeatMapData {
    id: number;
    seatMapName: string;
    row: number;
    column: number;
    floor: number;
    companyId: number;
    seats: SeatData[];
}