'use client';
import { fetchSeatMapById, fetchSeatMapId } from '@/services/seat_map/_v1';
import React, { useEffect, useRef, useState } from 'react';
import '@/styles/css/seatmap.css'
import { Autocomplete, Button, Card, Chip, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material';
import { Delete, Downloading, FileCopy, LocationOn, OpenWith, Restore } from '@mui/icons-material';
import { fetchTicketData, } from '@/services/ticket/_v1';
import LoadingIndicator from '@/lib/loading';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import useTicketData from '@/modules/ticket/hook/useTicketData ';
import { TicketData } from '@/modules/ticket/types/TicketData';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';


interface SeatMapProps {
    selectedItemId: number | null;
}

const TabSeatMap: React.FC<SeatMapProps> = ({ selectedItemId }) => {
    const { ticketData } = useTicketData(selectedItemId);

    const [client, setClient] = useState<Client | null>(null);
    
    const [connected, setConnected] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<number[]>([]);

    const clientId = useRef(Date.now());
   

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedSeat, setSelectedSeat] = useState<any>(null);






    const [showSelectedSeatInfo, setShowSelectedSeatInfo] = useState(false);

    const userId = useSelector((state: RootState) => state.auth.user?.id);
    const username = useSelector((state: RootState) => state.auth.user?.name);
    const [selectedUsernamesWS, setSelectedUsernamesWS] = useState<{ [key: number]: string }>({});
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
                    const { itemId, status, username, userId: updateUserId } = itemUpdate;

                    if (updateUserId !== userId) {
                        setSelectedUsernamesWS((prev) => ({
                            ...prev,
                            [itemId]: username, // Gán tên người dùng vào ghế
                        }));

                        setSelectedTicket((prev) => {
                            const isSelected = itemUpdate.status;

                            if (isSelected) {
                                // Thêm ghế vào danh sách đã chọn nếu chưa được chọn
                                if (!prev.includes(itemId)) {
                                    console.log("Seat added:", itemId);
                                    return [...prev, itemId];
                                }
                                console.log("Seat already selected:", itemId);
                                return prev; // Không thay đổi nếu ghế đã được chọn
                            } else {
                                // Bỏ ghế ra khỏi danh sách đã chọn nếu không còn được chọn
                                const newSelected = prev.filter(id => id !== itemId);
                                console.log("Seat removed:", itemId);
                                return newSelected;
                            }
                        });
                    }
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
            console.log("WebSocket client deactivated");
        };
    }, []);

    const sendMessage = (itemId: number, status: boolean, username: string, userId: number) => {
        if (client && connected) {
            client.publish({
                destination: '/app/send',
                body: JSON.stringify({ itemId,  status, username, userId }),
            });
        }
    };


    
    useEffect(() => {
        console.log("Ghế đang được chọn tại client:", selectedTicket);
    }, [selectedTicket]);

    const renderSeats = () => {
        const seatsByFloor: Record<number, Array<Array<any>>> = {};
        const seatMap = ticketData[0]?.seat?.seatMap || {};
        
        ticketData.forEach((ticket: TicketData) => {
            const { id, seat } = ticket;
            if (seat) {
                const { floor, row, seatColumn, name, status } = seat; // Assume status is a boolean
                if (!seatsByFloor[floor]) {
                    seatsByFloor[floor] = Array.from(
                        { length: seatMap.row },
                        () => Array(seatMap.seatColumn).fill(null)
                    );
                }
                seatsByFloor[floor][row - 1][seatColumn - 1] = { id, name, status, ticket };
            }
        });

        return Object.entries(seatsByFloor).map(([floor, rows]) => (
            <div className="flex flex-col w-full" >
                {rows.map((row: any[], rowIndex: React.Key | null | undefined) => (
                    <div key={rowIndex} className="seat-row">
                        {row.map((seat, colIndex) => {
                            const isSelected = seat && selectedTicket.includes(seat.id);
                            return (
                                <div key={colIndex}
                                    className={`${seat ? 
                                        (isSelected ? 'border-2 border-[#0072bc] rounded' : 
                                        (seat.status ? 'border border-[#a7a8a8] border-opacity-12 rounded ' : 'border-2 border-red-500')) 
                                        : 'border-2 border-gray-300'} 
                                        flex flex-col justify-between  relative cursor-pointer m-1 p-2 transition-colors duration-300 w-full`}
                                    
                                        onClick={() => {
                                            if (seat) {
                                                const seatId = seat.id;
                                                const isSeatSelected = selectedTicket.includes(seatId);
                                                
                                                // const isSelected = selectedTicket.includes(seatId);
                                                console.log(`Seat ID: ${seatId}, isSelected: ${isSelected}, seat.status: ${seat.status}`);
                                                setShowSelectedSeatInfo(!isSelected);
                                                sendMessage(seatId, !isSelected, username!, userId!);
                                                setSelectedTicket((prev) => 
                                                    isSeatSelected ? prev.filter(id => id !== seatId) : [...prev, seatId]
                                                );

                                            }
                                        }}
                                >
                                    {isSelected && <span className="text-sm text-gray-500">{selectedUsernamesWS[seat.id]}</span>}
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
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        ));

    };

    interface OptionType {
        id: number;
        label: string;
    }
    const options: OptionType[] = [
        { id: 10, label: 'Ten' },
        { id: 20, label: 'Twenty' },
        { id: 30, label: 'Thirty' },
    ];
    const [phone, setPhone] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [pickupPoint, setPickupPoint] = useState('');
    const [dropoffPoint, setDropoffPoint] = useState('');
    const [note, setNote] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [selectedValueAgency, setSelectedValueAgency] = useState('');

    const renderSelectedSeatInfo = () => {
        if (!showSelectedSeatInfo || selectedTicket.length === 0 || !selectedSeat) return null;


        const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const formData = {
                phone,
                fullName,
                email,
                pickupPoint,
                dropoffPoint,
                note,
                totalPrice,
                agency: selectedValueAgency,
                paymentMethod
            };

            try {
                console.log(formData);
                // Send POST request to your Next.js API route
                // const response = await fetch('/api/submitBooking', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(formData)
                // });

                // const result = await response.json();
                // if (response.ok) {
                //     alert('Booking successfully submitted');
                //     // Clear form (optional)
                //     setPhone('');
                //     setFullName('');
                //     setEmail('');
                //     setPickupPoint('');
                //     setDropoffPoint('');
                //     setNote('');
                //     setTotalPrice('');
                //     setSelectedValue('');
                //     setPaymentMethod('');
                // } else {
                //     alert('Error submitting booking: ' + result.message);
                // }
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error submitting the form');
            }
        };

        return (
            <div className="selected-seat-info slide-up">
                <form onSubmit={handleSubmit} >
                    <span style={{ fontWeight: '600' }}>THÔNG TIN HÀNH KHÁCH</span>
                    <hr />
                    <div style={{ marginBottom: 8 }}>
                        <TextField value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%' }} id="outlined-basic" label="Điện thoại" variant="outlined" size='small' />
                    </div>
                    <div style={{ marginBottom: 8 }}>
                        <TextField value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ width: '100%' }} id="outlined-basic" label="Họ và tên" variant="outlined" size='small' />
                    </div>
                    <div style={{ marginBottom: 8 }}>
                        <TextField value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%' }} id="outlined-basic" label="Email" variant="outlined" size='small' />
                    </div>
                    <hr />
                    <div style={{ marginBottom: 8 }}>
                        <TextField value={pickupPoint} onChange={(e) => setPickupPoint(e.target.value)} style={{ width: '100%' }} id="outlined-basic" label="Điểm đón" variant="outlined" size='small' />
                    </div>
                    <div style={{ marginBottom: 8 }}>
                        <TextField value={dropoffPoint} onChange={(e) => setDropoffPoint(e.target.value)} style={{ width: '100%' }} id="outlined-basic" label="Điểm trả" variant="outlined" size='small' />
                    </div>
                    <div style={{ marginBottom: 8 }}>
                        <TextField value={note} onChange={(e) => setNote(e.target.value)} style={{ width: '100%' }} id="outlined-basic" label="Ghi chú" multiline maxRows={4} size='small' />
                    </div>

                    <hr />
                    <div style={{ marginBottom: 8 }}>
                        <TextField value={totalPrice} onChange={(e) => setTotalPrice(e.target.value)} style={{ width: '100%' }} id="outlined-basic" label="Tổng tiền" multiline maxRows={4} size='small' />
                    </div>
                    <Autocomplete
                        options={options}
                        getOptionLabel={(option: OptionType | string) => {
                            if (typeof option === 'string') {
                                return option;
                            }
                            return option.label;
                        }}
                        value={selectedValueAgency}
                        onChange={(event, newValue) => {
                            setSelectedValueAgency(newValue ? (typeof newValue === 'string' ? newValue : newValue.label) : '');
                        }}
                        renderInput={(params) => <TextField {...params} label="Đại lý" variant="outlined" size="small" />}
                        freeSolo
                        style={{ marginBottom: 8 }}
                    />

                    <FormControl fullWidth style={{ marginBottom: 15 }}>
                        <InputLabel id="demo-simple-select-label" size='small'>Hình thức thanh toán</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Hình thức thanh toán"
                            size='small'
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <MenuItem value="counter">Thanh toán tại quầy</MenuItem>
                            <MenuItem value="bus">Thanh toán trên xe</MenuItem>
                            <MenuItem value="bank">Chuyển khoản</MenuItem>
                            <MenuItem value="agent">Đại lý thu tiền</MenuItem>
                            <MenuItem value="online" disabled>Online</MenuItem>
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
                    <p>{selectedTicket}</p>
                    <div >
                        <Button type="submit" style={{ marginRight: 5, backgroundColor: '#0072bc' }} variant="contained">Cập nhật</Button>
                        <Button style={{ marginRight: 5, backgroundColor: '#CC9900' }} variant="contained">In vé</Button>
                    </div>
                </form>
            </div>

        );
    };


    return (
        <>


            <div>selected item ID: {selectedItemId}</div>

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
export default TabSeatMap;