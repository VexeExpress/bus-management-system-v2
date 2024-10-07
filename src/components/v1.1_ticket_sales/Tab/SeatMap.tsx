'use client';
import { fetchSeatMapById, fetchSeatMapId } from '@/services/seat_map/_v1';
import React, { useEffect, useState } from 'react';
import '@/styles/css/seatmap.css'
import { Autocomplete, Button, Card, Chip, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material';
import { Delete, Downloading, FileCopy, LocationOn, OpenWith, Restore } from '@mui/icons-material';
import { fetchTicketData, } from '@/services/ticket/_v1';
import { SeatMapData } from '../../../types/SeatMap';
import LoadingIndicator from '@/lib/loading';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';


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
    const [selectedSeat, setSelectedSeat] = useState<any>(null);
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    interface OptionType {
        id: number;
        label: string;
    }
    const options: OptionType[] = [
        { id: 10, label: 'Ten' },
        { id: 20, label: 'Twenty' },
        { id: 30, label: 'Thirty' },
    ];

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
            // console.log("Ticket Data: " + JSON.stringify(data, null, 2));
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


    const [selectedTicket, setSelectedTicket] = useState<number[]>([]);

    const [client, setClient] = useState<Client | null>(null);
    const [connected, setConnected] = useState(false);
    useEffect(() => {
        // Khởi tạo kết nối STOMP client
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket as any, // Ép kiểu để tương thích
            reconnectDelay: 5000, // Tự động thử kết nối lại sau 5 giây
            onConnect: () => {
                console.log('Connected to WebSocket');
                setConnected(true);
                // Đăng ký nhận thông điệp từ /topic/item-updates
                stompClient.subscribe('/topic/item-updates', (message: IMessage) => {
                    const itemUpdate = JSON.parse(message.body);
                    console.log('Received message:', message.body);
                    setSelectedTicket((prev) => {
                        const newSelected = itemUpdate.status === 'selected' 
                            ? [...prev, itemUpdate.itemId] // Thêm ghế được chọn
                            : prev.filter(id => id !== itemUpdate.itemId); // Bỏ ghế được bỏ chọn
                        return newSelected;
                    });
                });
            },

            onDisconnect: () => {
                console.log('Disconnected from WebSocket');
                setConnected(false);
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });

        stompClient.activate();
        setClient(stompClient);

        return () => {
            stompClient.deactivate();
        };
    }, []);
    const sendMessage = (itemId: number, status: string) => {
        if (client && connected) {
            client.publish({
                destination: '/app/send',
                body: JSON.stringify({ itemId, status }),
            });
        }
    };



    





    const renderSeats = () => {
        const seatsByFloor: Record<number, Array<Array<any>>> = {};
        const seatMap = ticketData[0]?.seat?.seatMap || {};

        ticketData.forEach((ticket: Ticket) => {
            const { id, seat } = ticket;
            if (seat) {
                const { floor, row, seatColumn, name, status } = seat;
                if (!seatsByFloor[floor]) {
                    seatsByFloor[floor] = Array.from({ length: seatMap.row }, () => Array(seatMap.seatColumn).fill(null));
                }
                seatsByFloor[floor][row - 1][seatColumn - 1] = {
                    id,
                    name,
                    status,
                    ticket,
                };
            }
        });

        return Object.entries(seatsByFloor).map(([floor, rows]) => (
            <div className="seat-row" style={{ display: 'flex', flexDirection: 'column' }}>
                {rows.map((row: any[], rowIndex: React.Key | null | undefined) => (
                    <div key={rowIndex} className="seat-row">
                        {row.map((seat, colIndex) => {
                            const isSelected = seat && selectedTicket.includes(seat.id); // Check if seat is selected
                            return (
                                <Card
                                    key={colIndex}
                                    variant="outlined"
                                    className={`seat ${seat ? (isSelected ? 'selected' : (seat.status ? 'available' : 'booked')) : 'empty'}`}
                                    style={{
                                        flex: '1',
                                        height: 'auto',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        position: 'relative',
                                        cursor: seat ? 'pointer' : 'default',
                                    }}
                                    onClick={async () => {
                                        if (seat) {
                                            const seatId = seat.id;
                                            const newIsSelected = !selectedTicket.includes(seatId);
                                            console.log("ID: " + seatId);
                                            setSelectedTicket(prevIds =>
                                                newIsSelected
                                                    ? [...prevIds, seatId]
                                                    : prevIds.filter(id => id !== seatId) 
                                            );

                                            setSelectedSeat({ ...seat, ticketId: seat.id, ticketData: seat.ticket });
                                            sendMessage(seatId, newIsSelected ? 'selected' : 'deselected');
                                        }
                                    }}
                                >
                                    <div className="seat-info" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                        <span className="seat-name" style={{ fontWeight: 'bold', marginRight: '10px' }}>
                                            {seat ? seat.name : 'X'}
                                        </span>

                                        {seat && (
                                            <div className='seat-phone'>
                                                <span className="seat-status">
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
                                            <LocationOn style={{ color: '#DD0000', width: '20px', marginRight: '5px' }} />
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
                            );
                        })}
                    </div>
                ))}
            </div>
        ));

    };
    const [selectedValue, setSelectedValue] = useState('');

    const renderSelectedSeatInfo = () => {
        if (selectedTicket.length === 0 || !selectedSeat) return null;


        return (
            <div className="selected-seat-info slide-up">
                <span style={{ fontWeight: '600' }}>THÔNG TIN HÀNH KHÁCH</span>
                <hr />
                <div style={{ marginBottom: 8 }}>
                    <TextField style={{ width: '100%' }} id="outlined-basic" label="Điện thoại" variant="outlined" size='small' />
                </div>
                <div style={{ marginBottom: 8 }}>
                    <TextField style={{ width: '100%' }} id="outlined-basic" label="Họ và tên" variant="outlined" size='small' />
                </div>
                <div style={{ marginBottom: 8 }}>
                    <TextField style={{ width: '100%' }} id="outlined-basic" label="Email" variant="outlined" size='small' />
                </div>
                <hr />
                <div style={{ marginBottom: 8 }}>
                    <TextField style={{ width: '100%' }} id="outlined-basic" label="Điểm đón" variant="outlined" size='small' />
                </div>
                <div style={{ marginBottom: 8 }}>
                    <TextField style={{ width: '100%' }} id="outlined-basic" label="Điểm trả" variant="outlined" size='small' />
                </div>
                <div style={{ marginBottom: 8 }}>
                    <TextField style={{ width: '100%' }} id="outlined-basic" label="Ghi chú" multiline maxRows={4} size='small' />
                </div>

                <hr />
                <div style={{ marginBottom: 8 }}>
                    <TextField style={{ width: '100%' }} id="outlined-basic" label="Tổng tiền" multiline maxRows={4} size='small' />
                </div>
                <Autocomplete
                    style={{ marginBottom: 8 }}
                    options={options}
                    getOptionLabel={(option: OptionType | string) => {
                        if (typeof option === 'string') {
                            return option;
                        }
                        return option.label;
                    }}
                    value={selectedValue}
                    onChange={(event, newValue) => {
                        setSelectedValue(newValue ? (typeof newValue === 'string' ? newValue : newValue.label) : '');
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Đại lý" variant="outlined" size="small" />
                    )}
                    freeSolo
                />
                <FormControl fullWidth style={{ marginBottom: 15 }}>
                    <InputLabel id="demo-simple-select-label" size='small'>Hình thức thanh toán</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Hình thức thanh toán"
                        size='small'
                    >
                        <MenuItem value={1}>Thanh toán tại quầy</MenuItem>
                        <MenuItem value={2}>Thanh toán trên xe</MenuItem>
                        <MenuItem value={3}>Chuyển khoản</MenuItem>
                        <MenuItem value={4} disabled>Online</MenuItem>
                        <MenuItem value={5}>Đại lý thu tiền</MenuItem>
                    </Select>
                </FormControl>
                <div style={{ marginBottom: 30 }}>
                    <Tooltip title="Sao chép vé" arrow >
                        <IconButton style={{ backgroundColor: '#EEEEEE', marginRight: 5 }} color="primary" aria-label="Sao chép" >
                            <FileCopy />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Di chuyển vé" arrow>
                        <IconButton style={{ backgroundColor: '#EEEEEE', marginRight: 5 }} color="primary" aria-label="Di chuyển" >
                            <OpenWith />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Lịch sử vé" arrow>
                        <IconButton style={{ backgroundColor: '#EEEEEE', marginRight: 5 }} color="primary" aria-label="Lịch sử">
                            <Restore />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Chuyển xuống danh sách chờ xử lý" arrow>
                        <IconButton style={{ backgroundColor: '#EEEEEE', marginRight: 5 }} color="primary" aria-label="Chờ xử lý" >
                            <Downloading />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Hủy vé" arrow>
                        <IconButton style={{ backgroundColor: '#EEEEEE', marginRight: 5 }} color="primary" aria-label="Hủy vé">
                            <Delete />
                        </IconButton>
                    </Tooltip>

                </div>
                <p>ID: {selectedSeat.id}</p>
                <p>Ghế: {selectedSeat.name}</p>
                <p>Trạng thái: {selectedSeat.status ? 'Có sẵn' : 'Đã đặt'}</p>
                <p>{selectedTicket}</p>
                <div >
                    <Button style={{ marginRight: 5, backgroundColor: '#0072bc' }} variant="contained">Cập nhật</Button>
                    <Button style={{ marginRight: 5, backgroundColor: '#CC9900' }} variant="contained">In vé</Button>
                </div>


            </div>
        );
    };


    return (
        <>
          

            <div>Sơ đồ ghế, selected item ID: {selectedItemId}</div>

            <div>
                {loading && <><LoadingIndicator /></>}
                {error && <p>{error}</p>}

                {ticketData && ticketData.length > 0 ? (
                    <div className="seat-map">
                        {renderSeats()}

                    </div>
                ) : (
                    <p>Không có ghế nào.</p>
                )}
            </div>
            {renderSelectedSeatInfo()}
        </>
    );
};
export default SeatMap;