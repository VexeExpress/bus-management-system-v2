'use client';
import { Trip } from "@/types/Trip";
import { Box, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import React from "react";
import useSeatMap from "@/modules/seat_map/hook/useSeatMap";
import LoadingIndicator from "@/lib/loading";
import useVehicles from "@/modules/vehicle/hook/useVehicles";
import useUsers from "@/modules/user/hook/useUsers";
const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};
interface TripModalProps {
    open: boolean;
    companyId: number;
    onClose: () => void;
    onAdd: (data: any) => void;
    edit: Trip | null;
    selectedDate?: Date;
    selectedRouteId: number;
    selectedRouteName?: string;
}
const TripModal: React.FC<TripModalProps> = ({ open, onClose, onAdd, companyId, edit, selectedDate, selectedRouteId, selectedRouteName }) => {
    const [selectedVehicle, setSelectedVehicle] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<number[]>([]);
    const [selectedSeatMap, setSelectedSeatMap] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [selectedNote, setSelectedNote] = useState<string>('');
    const { seatMapsName, loading: loadingSeatMaps } = useSeatMap(companyId);
    const { vehicleName, loading: loadingVehicle } = useVehicles(companyId);
    const { driverName, loading: loadingDriverName } = useUsers(companyId);
    const isLoading = loadingSeatMaps || loadingVehicle || loadingDriverName;
    useEffect(() => {

        if (edit) {
            // Logic for edit mode
        } else {
            // Logic for non-edit mode
        }
    }, [companyId, edit]);
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formattedDateTrip = dayjs(selectedDate).format('YYYY-MM-DD');
        const data = {
            routerId: selectedRouteId,
            dateTrip: formattedDateTrip,
            vehicleId: selectedVehicle,
            userId: selectedUser,
            seatMapId: selectedSeatMap,
            time: selectedTime,
            note: selectedNote,
            companyId: companyId,
        };
        console.log(data);
        try {
            if (edit) {
                // await onUpdate({ ...data, id: edit.id });
            } else {
                await onAdd(data);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        } finally {

            onClose();
        }
    };
    const formatDateForInput = (date: Date | undefined): string => {
        return date ? dayjs(date).format('DD-MM-YYYY') : '';
    };
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal} className="p-6 rounded-lg shadow-lg bg-white">
                <h2 className="font-semibold text-xl mb-4">
                    {edit ? 'CẬP NHẬT THÔNG TIN CHUYẾN' : 'THÊM CHUYẾN MỚI'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full sm:w-1/3 px-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Tuyến
                                </label>
                                <TextField
                                    className="mt-1 mb-3"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="selectedRoute"
                                    type="text"
                                    size="small"
                                    disabled
                                    value={selectedRouteName}
                                    InputProps={{ readOnly: true }}
                                />
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Sơ đồ ghế
                                </label>
                                <Select
                                    className="block mt-1"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    required
                                    fullWidth
                                    size="small"
                                    value={selectedSeatMap}
                                    onChange={(e) => setSelectedSeatMap(e.target.value)}
                                >
                                    {isLoading ? (
                                        <div className='h-24'><LoadingIndicator /></div>
                                    ) : (
                                        seatMapsName.length > 0 ? (
                                            seatMapsName.map((seatMap, index) => (
                                                <MenuItem key={index} value={seatMap.id}>
                                                    {seatMap.seatMapName}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <div className='h-24'><LoadingIndicator /></div>
                                        )
                                    )}
                                </Select>
                            </div>
                            <div className="w-full sm:w-1/3 px-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Ngày khởi hành
                                </label>
                                <TextField
                                    className="mt-1 mb-3"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="selectedDate"
                                    type="text"
                                    size="small"
                                    value={formatDateForInput(selectedDate)}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    disabled
                                />
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Xe
                                </label>
                                <Select
                                    className="block mt-1"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    fullWidth
                                    size="small"
                                    value={selectedVehicle}
                                    onChange={(e) => setSelectedVehicle(e.target.value)}
                                >
                                    {isLoading ? (
                                        <div className='h-24'><LoadingIndicator /></div>
                                    ) : (
                                        vehicleName.length > 0 ? (
                                            vehicleName.map((vehicle, index) => (
                                                <MenuItem key={index} value={vehicle.id}>
                                                    {vehicle.licensePlate}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <div className='h-24'><LoadingIndicator /></div>
                                        )
                                    )}
                                </Select>
                            </div>
                            <div className="w-full sm:w-1/3 px-3">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Giờ khởi hành
                                </label>
                                <TextField
                                    className="mt-1 mb-3"
                                    margin="normal"
                                    required
                                    name="time"
                                    type="time"
                                    size="small"
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                />
                            </div>
                        </div>
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Tài xế
                        </label>
                        <Select
                            multiple
                            fullWidth
                            size="small"
                            name="selectedUser"
                            value={selectedUser}
                            onChange={(e) => setSelectedUser(e.target.value as number[])}
                        >
                            {isLoading ? (
                                <div className='h-24'><LoadingIndicator /></div>
                            ) : (
                                driverName.length > 0 ? (
                                    driverName.map((d, index) => (
                                        <MenuItem key={index} value={d.id}>
                                            {d.name}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <div className='h-24'><LoadingIndicator /></div>
                                )
                            )}
                        </Select>

                        <label className="block text-sm font-medium leading-6 text-gray-900">
                            Ghi chú
                        </label>
                        <TextField
                            id="outlined-multiline-flexible"
                            multiline
                            fullWidth
                            size="small"
                            maxRows={4}
                            value={selectedNote}
                            onChange={(e) => setSelectedNote(e.target.value)}
                            className="mt-1 mb-3"
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <button onClick={onClose} type="button" className="bg-transparent border border-blue-500 text-blue-500 rounded px-4 py-2 mr-2 hover:bg-blue-500 hover:text-white">
                            Hủy
                        </button>
                        <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
                            {edit ? 'Cập nhật' : 'Thêm'}
                        </button>
                    </div>
                </form>
            </Box>
        </Modal>
    )
}
export default TripModal;