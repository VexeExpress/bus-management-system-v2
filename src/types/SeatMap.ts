export interface SeatData {
    row: number;
    column: number;
    floor: number;
    name: string;
    status:boolean;
}
export interface SeatMapData {

    seatMapName: string;
    row: number;
    column: number;
    floor: number;
    company: {
        id: number;
    }
    seats: SeatData[];
}