import { useForm } from "react-hook-form";
import { SeatMapData } from "../types/SeatMapData";
import { Box, Button, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { SeatData } from "../types/SeatData";

interface ModalSeatMapProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: SeatMapData, initialData?: SeatMapData) => void;
    initialData: SeatMapData | null;
}
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%', // Adjust width if needed
    maxHeight: '80%', // Limit maximum height
    overflowY: 'auto', // Allow vertical scrolling
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const ModalSeatMap: React.FC<ModalSeatMapProps> = ({ open, onClose, onSubmit, initialData }) => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<SeatMapData>({
        mode: "onTouched",
    });
    const [floor, setSelectedFloor] = useState(1);
    const [row, setSelectedRow] = useState(1);
    const [column, setSelectedColumn] = useState(1);
    const [seats, setSeats] = useState<SeatData[]>([]);
    useEffect(() => {
        if (open) {
            console.log("Modal opened. Initial data:", initialData);
            if (initialData) {
                setValue('seatMapName', initialData.seatMapName || '');
                setValue('floor', initialData.floor || 1);
                setValue('row', initialData.row || 1);
                setValue('column', initialData.column || 1);

                setSelectedFloor(initialData.floor || 1);
                setSelectedRow(initialData.row || 1);
                setSelectedColumn(initialData.column || 1);
                
                setSeats(initialData.seats || []);

            } else {
                reset();
                setSeats([]);
            }
        }
    }, [open, initialData, setValue, reset]);
    const handleClose = () => {
        reset();
        onClose();
    };
    const onSubmitForm = (data: SeatMapData) => {
        const completeData = {
            ...data,
            seats: seats
        };
        console.log("Submitting form:", completeData);
        onSubmit(completeData, initialData ?? undefined);
        handleClose();
    };

    const renderSeatMap = () => {
        const seatMaps = [];

        for (let f = 0; f < floor; f++) {
            const floorSeats = [];
            for (let i = 0; i < row; i++) {
                const rowSeats = [];
                for (let j = 0; j < column; j++) {
                    const seatKey = `Tầng ${f + 1} Ghế ${i + 1}-${j + 1}`;

                    const existingSeat = seats.find(seat =>
                        seat.floor === f + 1 && seat.row === i + 1 && seat.column === j + 1
                    );

                    rowSeats.push(
                        <div key={`${seatKey}`} className="m-2 p-4 border border-gray-300 rounded-lg shadow-md bg-white">
                            <input
                                type="text"
                                placeholder="Tên ghế"
                                required
                                value={existingSeat ? existingSeat.name : ''}
                                onChange={(e) => {
                                    const seatData: SeatData = {
                                        floor: f + 1,
                                        row: i + 1,
                                        column: j + 1,
                                        name: e.target.value,
                                        status: existingSeat ? existingSeat.status : false,
                                    };

                                    setSeats((prevSeats) => {
                                        const updatedSeats = [...prevSeats];
                                        const index = updatedSeats.findIndex(seat =>
                                            seat.floor === seatData.floor &&
                                            seat.row === seatData.row &&
                                            seat.column === seatData.column
                                        );
                                        if (index > -1) {
                                            updatedSeats[index] = { ...updatedSeats[index], name: seatData.name };
                                        } else {
                                            updatedSeats.push(seatData);
                                        }
                                        return updatedSeats;
                                    });
                                }}
                            />

                            <div className="mt-2 flex items-center">
                                <span className="mr-2">Kích hoạt</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={existingSeat ? existingSeat.status : false}
                                        onChange={(e) => {
                                            const newStatus = e.target.checked;
                                            const seatData: SeatData = {
                                                floor: f + 1,
                                                row: i + 1,
                                                column: j + 1,
                                                name: existingSeat ? existingSeat.name : '',
                                                status: newStatus,
                                            };

                                            setSeats((prevSeats) => {
                                                const updatedSeats = [...prevSeats];
                                                const index = updatedSeats.findIndex(seat =>
                                                    seat.floor === seatData.floor &&
                                                    seat.row === seatData.row &&
                                                    seat.column === seatData.column
                                                );
                                                if (index > -1) {
                                                    updatedSeats[index] = { ...updatedSeats[index], status: newStatus };
                                                } else {
                                                    updatedSeats.push(seatData);
                                                }
                                                return updatedSeats;
                                            });
                                        }}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer-checked:bg-blue-500 flex items-center transition-colors duration-200">
                                        <div className={`w-5 h-5 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform ${existingSeat && existingSeat.status ? 'translate-x-full' : ''}`}></div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    );
                }
                floorSeats.push(
                    <div key={`floor-${f}-row-${i}`} style={{ display: 'flex', justifyContent: 'center' }}>
                        {rowSeats}
                    </div>
                );
            }
            seatMaps.push(
                <div key={`floor-${f}`} style={{ margin: '20px 0' }}>
                    <h4>{`Tầng ${f + 1}`}</h4>
                    {floorSeats}
                </div>
            );
        }
        return seatMaps;
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <span className="text-[20px] text-blue-500">
                    {initialData ? "Cập nhật thông tin sơ đồ ghế" : "Thêm sơ đồ ghế mới"}
                </span>
                <form onSubmit={handleSubmit(onSubmitForm)} className="mt-5">
                    <div className="mb-4 flex justify-between">
                        <div className="flex-1 mr-2">
                            <label htmlFor="seatMapName">Tên sơ đồ</label>
                            <input
                                id="seatMapName"
                                {...register('seatMapName', { required: "*Vui lòng nhập tên sơ đồ" })}
                                type="text"
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                            />
                            {errors.seatMapName && <p className="text-red-500 text-[13px]">{errors.seatMapName.message}</p>}
                        </div>
                        <div className="flex-1 mr-2">
                            <label htmlFor="floor">Số tầng</label>
                            <select
                                id="floor"
                                {...register('floor')}
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                                onChange={(e) => setSelectedFloor(Number(e.target.value))}
                            >
                                {Array.from({ length: 3 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {index + 1} tầng
                                    </option>
                                ))}

                            </select>
                        </div>
                        <div className="flex-1 mr-2">
                            <label htmlFor="row">Số hàng</label>
                            <select
                                id="row"
                                {...register('row')}
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                                onChange={(e) => setSelectedRow(Number(e.target.value))}
                            >
                                {Array.from({ length: 20 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {index + 1} hàng
                                    </option>
                                ))}

                            </select>
                        </div>
                        <div className="flex-1 mr-2">
                            <label htmlFor="column">Số cột</label>
                            <select
                                id="column"
                                {...register('column')}
                                className="w-full p-2 mt-1 border border-gray-300 rounded"
                                onChange={(e) => setSelectedColumn(Number(e.target.value))}
                            >
                                {Array.from({ length: 10 }, (_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {index + 1} cột
                                    </option>
                                ))}

                            </select>
                        </div>
                    </div>
                    <div className="w-full">
                        {renderSeatMap()}
                    </div>

                    <div className="flex justify-end mt-4">
                        <Button sx={{ marginRight: 2 }} onClick={handleClose} variant="outlined" color="secondary">
                            Hủy
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            {initialData ? "Cập nhật" : "Thêm"}
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    )
}
export default ModalSeatMap;