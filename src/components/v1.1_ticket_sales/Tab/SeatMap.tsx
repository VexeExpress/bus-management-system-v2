'use client';
import { fetchSeatMapById, fetchSeatMapId } from '@/services/seat_map/_v1';
import React, { useEffect, useState } from 'react';
import '@/styles/css/seatmap.css'
import { Card } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import { fetchTicketData } from '@/services/ticket/_v1';
import { SeatMapData } from '../../../types/SeatMap';
import LoadingIndicator from '@/lib/loading';

interface Ticket {
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
interface SeatMapProps {
    selectedItemId: number | null;
}

const SeatMap: React.FC<SeatMapProps> = ({ selectedItemId }) => {
    const [seatMapId, setSeatMapId] = useState<number | null>(null);
    const [ticketData, setTicketData] = useState<any>(null);
    const [seatMapData, setSeatMapData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getSeatMapId = async () => {
        try {
            if (!selectedItemId) return;
            setLoading(true);
            const id = await fetchSeatMapId(selectedItemId);
            console.log("Seat Map ID: " + id);
            setSeatMapId(id);
            await getSeatMapData(id);
        } catch (err) {
            setError('Không thể tải ID sơ đồ ghế.');
        } finally {
            setLoading(false);
        }
    };
    const getSeatMapData = async (id: number) => {
        try {
            const data = await fetchSeatMapById(id);
            setSeatMapData(data);
            console.log("Seat Map Data: " + JSON.stringify(data, null, 2));
        } catch (err) {
            setError('Không thể tải sơ đồ ghế.');
        }
    };
    const getTicketData = async () => {
        try {
            if (!selectedItemId) return;
            setLoading(true);
            const data = await fetchTicketData(selectedItemId);
            console.log("Ticket Data: " + JSON.stringify(data, null, 2));
            setTicketData(data);
        } catch (err) {
            setError('Không thể tải sơ đồ ghế.');
            setTicketData([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getTicketData();
    }, [selectedItemId]);

    const renderSeats = () => {
        const seatsByFloor = {};
        const seatMap = ticketData[0]?.seat?.seatMap || {};

        ticketData.forEach(({ seat }: Ticket) => {
            const { floor, row, seatColumn, name, status } = seat;
            if (!seatsByFloor[floor]) {
                seatsByFloor[floor] = Array.from({ length: seatMap.row }, () => Array(seatMap.seatColumn).fill(null));
            }
            seatsByFloor[floor][row - 1][seatColumn - 1] = { name, status, ...seat.seatMap };
        });

        return Object.entries(seatsByFloor).map(([floor, rows]) => (
            <div className="seat-row" style={{ display: 'flex', flexDirection: 'column' }}>
                {rows.map((row: any[], rowIndex: React.Key | null | undefined) => (
                    <div key={rowIndex} className="seat-row">
                        {row.map((seat, colIndex) => (
                            <Card
                                key={colIndex}
                                variant="outlined"
                                className={`seat ${seat ? (seat.status ? 'available' : 'booked') : 'empty'}`}
                                style={{
                                    flex: '1',
                                    height: 'auto',
                                    margin: '5px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    padding: '10px'
                                }}
                            >
                                <div className="seat-info" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                    <span className="seat-name" style={{ fontWeight: 'bold', marginRight: '10px' }}>
                                        {seat ? seat.name : 'X'}
                                    </span>

                                    {seat && (
                                        <div className='seat-phone' >
                                            <span className="seat-status" >
                                                {seat.phoneNumber || '0397892603'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className='seat-from-to' style={{ marginTop: '10px', width: '100%' }}>
                                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                        <LocationOn style={{ color: '#0072bc', width: '20px', marginRight: '5px' }} />
                                        <span style={{ fontSize: '15px', color: 'rgb(35, 39, 49)' }}>Điểm đi</span>
                                    </span>
                                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                        <LocationOn style={{ color: '#DD0000	', width: '20px', marginRight: '5px' }} />
                                        <span style={{ fontSize: '15px', color: 'rgb(35, 39, 49)' }}>Điểm đến</span>
                                    </span>
                                </div>
                                <div className='seat-note'>
                                    <span>* dg, kèm 1 xe máy </span>
                                </div>
                                <div className="info-row">
                                    <span>TTTX</span>
                                    <span>200.000</span>
                                </div>
                                <div className="status-bar"></div>
                                <div>
                                    <span style={{ fontSize: '13px', color: 'black' }}>B: Đặng Tuấn Thành/ VP An Sương</span>
                                </div>
                            </Card>
                        ))}
                    </div>
                ))}
            </div>
        ));

    };

    return (
        <>
            <div>Sơ đồ ghế, selected item ID: {selectedItemId}</div>

            <div>
                {loading && <><LoadingIndicator/></>}
                {error && <p>{error}</p>}

                {ticketData && ticketData.length > 0 ? (
                    <div className="seat-map">
                        {renderSeats()}
                    </div>
                ) : (
                    <p>Không có ghế nào.</p>
                )}





            </div>
        </>
    );
};
export default SeatMap;