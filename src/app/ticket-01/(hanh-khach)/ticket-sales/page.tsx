'use client';
import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControl, InputLabel, MenuItem, Select, Tab, TextField } from "@mui/material";
import Grid from '@mui/material/Grid2';
import '@/styles/css/global.css';
import styles from "@/styles/module/TicketSales.module.css";
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ListTrip from '@/modules/trip/components/ListTrip';
import { AddCircleOutline, AutoMode, ExpandMore } from '@mui/icons-material';
import { fetchActiveRouters } from '@/services/route/_v1';
import TripModal from '@/modules/trip/components/TripModal';
import { Trip } from '@/types/Trip';
import Toast from '@/lib/toast';
import { createTrip, fetchTripDetails } from '@/services/trip/_v1';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SeatMap from '@/components/v1.1_ticket_sales/Tab/SeatMap';
import TicketList from '@/components/v1.1_ticket_sales/Tab/TicketList';
import CustomerTransfer from '@/components/v1.1_ticket_sales/Tab/CustomerTransfer';
import CargoOnBus from '@/components/v1.1_ticket_sales/Tab/CargoOnBus';
import TripFinances from '@/components/v1.1_ticket_sales/Tab/TripFinances';
import LoadingIndicator from '@/lib/loading';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import useRouteSelection from '@/modules/route/hook/useRouteSelection';
export default function BanVe() {
    const companyId = useSelector((state: RootState) => state.auth.user?.companyId);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const { route, loading, setRoute } = useRouteSelection(companyId);
    const [open, setOpen] = useState(false);
    const [selectedRouteId, setSelectedRouteId] = useState<number | null>(null);
    const [selectedDate, setValue] = useState<Date | null>(new Date());
    const openModal = () => {
        setOpen(true)
    };

    
    
    const [selectedRouteName, setSelectedRouteName] = useState<string>('');
    

    
    const [edit, setEditTrip] = useState<Trip | null>(null);

    const formatDateToVietnamese = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');

        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const handleDateChange: CalendarProps['onChange'] = (date) => {
        if (date instanceof Date) {
            setValue(date);
            console.log(date);
            setItemSelected(false);
        }
        setShowCalendar(false);
    };
    const handleInputClick = () => {
        setShowCalendar(!showCalendar);

    };

    // modal add trip
    


    const [valueTab, setValueTab] = useState<string>('1');
    const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
        setValueTab(newValue);
    };
    const [itemSelected, setItemSelected] = useState<boolean>(false);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const [tripDetails, setTripDetails] = useState<any>(null);

    const handleItemSelect = (id: number) => {
        setItemSelected(true);
        setSelectedItemId(id);
    };

    const handleAdd = async (newData: Trip) => {
        try {
            console.log("Data: " + JSON.stringify(newData));
            const newTrip = await createTrip(newData);
            console.log("Trip added: " + JSON.stringify(newTrip));
            Toast.success("Tạo chuyến thành công")
        } catch (error: any) {
            console.error('Error creating trip:', error.message);
        }
    }
    const fetchTripDetailsById = async (id: number) => {
        if (id === null) return;
        try {
            const data = await fetchTripDetails(id);
            console.log("Data Trip Detail: ", data);
            setTripDetails(data);
        } catch (error) {
            console.error('Error fetching trip details:', error);
        }
    };
   
    useEffect(() => {
        if (selectedItemId) {
            fetchTripDetailsById(selectedItemId);
        }
    }, [selectedItemId]);


    return (
        <>
            <section className={styles.row}>
                <div style={{ marginRight: 12 }}>
                    <Button variant="contained" style={{ textTransform: 'none', fontFamily: 'Rounded' }}>Hôm nay</Button>
                </div>

                <div style={{ position: 'relative', }}>
                    <TextField
                        size="small"
                        style={{ minWidth: 250, fontFamily: 'Rounded' }}
                        id="outlined-basic"
                        variant="outlined"
                        value={selectedDate ? formatDateToVietnamese(selectedDate) : ''}
                        onClick={handleInputClick}
                        InputProps={{
                            readOnly: true,
                        }} />
                    {showCalendar && (
                        <div
                            style={{
                                position: 'absolute',
                                zIndex: 1000,
                                top: 42,
                                left: 0,
                            }}
                        >
                            <Calendar onChange={handleDateChange} value={selectedDate} />
                        </div>
                    )}
                </div>

                <div>
                    <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
                        <InputLabel id="demo-simple-select-label">
                            <span style={{ fontFamily: 'Rounded' }}>Chọn tuyến</span>
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedRouteId}
                            label="Chọn tuyến"
                            onChange={(e) => {
                                const selectedRouteId = e.target.value;
                                setItemSelected(false);
                                setSelectedRouteId(selectedRouteId);
                                const selectedRoute = route.find((r: any) => r.id === selectedRouteId);
                                if (selectedRoute) {
                                    setSelectedRouteName(selectedRoute.routeName);
                                }
                            }}
                        >
                            {loading ? (
                                <div className='h-24'><LoadingIndicator /></div>
                            ) : (
                                route.length > 0 ? (
                                    route.map((r, index) => (
                                        <MenuItem key={index} value={r.id}>
                                            {r.routeName}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <div className='h-24'><LoadingIndicator/></div>
                                )
                            )}
                        </Select>
                    </FormControl>

                </div>



                <div style={{ marginLeft: 'auto', marginRight: '10px' }}>
                    <Button startIcon={<AutoMode />} variant="contained" style={{ textTransform: 'none', fontFamily: 'Rounded' }}>Làm mới</Button>
                </div>
                {selectedRouteId && (
                    <div style={{ marginRight: '10px', marginLeft: '-10px' }}>
                        <Button startIcon={<AddCircleOutline />} variant="contained" style={{ textTransform: 'none', fontFamily: 'Rounded' }} onClick={openModal}>Tăng cường chuyến</Button>
                    </div>
                )}
            </section>
            <section>
                <ListTrip companyId={companyId} selectedDate={selectedDate} selectedRouteId={selectedRouteId} onItemSelect={handleItemSelect} />
            </section>
            {itemSelected && ( // Conditionally render based on itemSelected state
                <>
                    <section>
                        {tripDetails ? (
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <span style={{ fontWeight: '600', fontSize: '16px' }}>
                                        {tripDetails.time ? tripDetails.time.slice(0, 5) : ''}
                                    </span>
                                    <span style={{ marginLeft: 5, marginRight: 5 }}>•</span>
                                    <span style={{ fontWeight: '600', fontSize: '16px' }}>
                                        {tripDetails.routerName}
                                    </span>

                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={3}>
                                        <Grid size={4}>
                                            <span style={{ fontSize: '15px', display: 'block' }}>
                                                Biển số: <span style={{ fontWeight: '600', color: '#0072bc' }}>{tripDetails.licensePlate}</span>
                                            </span>
                                            <span style={{ fontSize: '15px', display: 'block' }}>
                                                Sơ đồ ghế: <span style={{ fontWeight: '600', color: '#0072bc' }}>{tripDetails.seatMap}</span>
                                            </span>
                                            <span style={{ fontSize: '15px', display: 'block' }}>
                                                Khởi hành: <span style={{ fontWeight: '600', color: '#0072bc' }}>{tripDetails.time ? tripDetails.time.slice(0, 5) : ''} - {tripDetails.date ? dayjs(tripDetails.date).format('DD-MM-YYYY') : ''}</span>
                                            </span>
                                        </Grid>
                                        <Grid size={4}>
                                            <span style={{ fontSize: '15px', display: 'block' }}>
                                                Tài xế: <span style={{ fontWeight: '600', color: '#0072bc' }}> {tripDetails.user ? tripDetails.user.join(', ') : ''}</span>
                                            </span>
                                            <span style={{ fontSize: '15px', display: 'block' }}>
                                                Số điện thoại xe: <span style={{ fontWeight: '600', color: '#0072bc' }}>{tripDetails.vehcilePhone}</span>
                                            </span>
                                        </Grid>
                                        <Grid size={4}>
                                            <span style={{ fontSize: '15px', display: 'block' }}>
                                                Số vé: <span style={{ fontWeight: '600', color: '#0072bc' }}>0</span>
                                            </span>
                                            <span style={{ fontSize: '15px', display: 'block' }}>
                                                Số hàng: <span style={{ fontWeight: '600', color: '#0072bc' }}>0</span>
                                            </span>
                                        </Grid>
                                    </Grid>
                                    <div>
                                        <span style={{ fontSize: '15px', display: 'block' }}>
                                            Đặt chỗ: <span style={{ color: 'black' }}>( VP An Sương: 3 / VP Tân Bình: 5 / VP Buôn Ma Thuột: 9 )</span>
                                        </span>
                                    </div>

                                </AccordionDetails>
                            </Accordion>
                        ) : (
                            <LoadingIndicator />
                        )}
                    </section>
                    <section>
                        <TabContext value={valueTab}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                                    <Tab label="Sơ đồ ghế" value="1" />
                                    <Tab label="Danh sách vé" value="2" />
                                    <Tab label="Trung chuyển" value="3" />
                                    <Tab label="Hàng trên xe" value="4" />
                                    <Tab label="Thu chi chuyến" value="5" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <SeatMap selectedItemId={selectedItemId} />
                            </TabPanel>
                            <TabPanel value="2">
                                <TicketList />
                            </TabPanel>
                            <TabPanel value="3">
                                <CustomerTransfer />
                            </TabPanel>
                            <TabPanel value="4">
                                <CargoOnBus />
                            </TabPanel>
                            <TabPanel value="5">
                                <TripFinances />
                            </TabPanel>
                        </TabContext>
                    </section>
                </>
            )}
            <TripModal open={open} onClose={() => setOpen(false)} edit={edit} onAdd={handleAdd} companyId={companyId} selectedDate={selectedDate ?? new Date()} selectedRouteId={selectedRouteId} selectedRouteName={selectedRouteName}
            />
        </>
    );
}
