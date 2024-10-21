export interface TicketData {
    id: number;
    seat: {
        id: number;
        floor: number;
        row: number;
        seatColumn: number;
        name: string;
        status: boolean;
        seatMap: {
            id: number;
            row: number;
            seatColumn: number;
            floor: number;
        }
    }
}