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
import TripModal from '@/modules/trip/components/TripModal';
import { fetchTripDetails } from '@/services/trip/_v1';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SeatMap from '@/modules/seat_map/components/TabSeatMap';
import TicketList from '@/components/v1.1_ticket_sales/Tab/TicketList';
import CustomerTransfer from '@/components/v1.1_ticket_sales/Tab/CustomerTransfer';
import CargoOnBus from '@/components/v1.1_ticket_sales/Tab/CargoOnBus';
import TripFinances from '@/components/v1.1_ticket_sales/Tab/TripFinances';
import LoadingIndicator from '@/lib/loading';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import useRoute from '@/modules/route/hook/useRoute';
import { TripData } from '@/modules/trip/types/TripData';
import useManageTrip from '@/modules/trip/hook/useManageTrip';
import { formatDateToVietnamese } from '@/lib/dateUtils';
import useTripDetails from '@/modules/trip/hook/useTripDetails';
export default function BanVe() {
    const companyId = useSelector((state: RootState) => state.auth.user?.companyId);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedRouteId, setSelectedRouteId] = useState<number>(0);
    const [selectedDate, setValue] = useState<Date | null>(new Date());
    const [selectedRouteName, setSelectedRouteName] = useState<string>('');

    const { routeNameAction } = useRoute(companyId);
    const [tripAdded, setTripAdded] = useState(false);
    const { handleAdd } = useManageTrip();
    const onAddTrip = async (tripData: TripData) => {
        await handleAdd(tripData);
        setTripAdded(true);
    };

    const openModal = () => {
        setOpen(true)
    };



    



    const [edit, setEditTrip] = useState<TripData | null>(null);



    // Calendar
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




    const [valueTab, setValueTab] = useState<string>('1');
    const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
        setValueTab(newValue);
    };
    const [itemSelected, setItemSelected] = useState<boolean>(false);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);


    const handleItemSelect = (id: number) => {
        setItemSelected(true);
        setSelectedItemId(id);
    };

    const { tripDetails } = useTripDetails(selectedItemId);


    return (
        <>
            <section className="flex items-center gap-4 pl-2.5">
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
                                const selectedRouteId = Number(e.target.value);
                                setItemSelected(false);
                                setSelectedRouteId(selectedRouteId);
                                const selectedRoute = routeNameAction.find((r: any) => r.id === selectedRouteId);
                                if (selectedRoute) {
                                    setSelectedRouteName(selectedRoute.routeName);
                                }
                            }}
                        >
                            {loading ? (
                                <div className='h-24'><LoadingIndicator /></div>
                            ) : (
                                routeNameAction.length > 0 ? (
                                    routeNameAction.map((r, index) => (
                                        <MenuItem key={index} value={r.id}>
                                            {r.routeName}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <div className='h-24'><LoadingIndicator /></div>
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
                <ListTrip companyId={companyId ?? 0} selectedDate={selectedDate ?? new Date()} selectedRouteId={selectedRouteId} onItemSelect={handleItemSelect} setTripAdded={setTripAdded} tripAdded={tripAdded}/>
                <TripModal open={open} onClose={() => setOpen(false)} edit={edit} onAdd={onAddTrip} companyId={companyId ?? 0} selectedDate={selectedDate ?? new Date()} selectedRouteId={selectedRouteId ?? 0} selectedRouteName={selectedRouteName} />
            </section>
            {itemSelected && (
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
                                                Số điện thoại xe: <span style={{ fontWeight: '600', color: '#0072bc' }}>{tripDetails.vehiclePhone}</span>
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
                                <TabList onChange={handleChangeTab} aria-label="lab API">
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

        </>
    );
}
