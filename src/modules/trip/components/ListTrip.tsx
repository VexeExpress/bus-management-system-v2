'use client';

import React, { useEffect, useState } from "react";
import LoadingIndicator from "@/lib/loading";
import dayjs from "dayjs";
import useListTrip from "../hook/useListTrip";
import { TripData } from "../types/TripData";
interface ListTripProps {
    companyId: number;
    selectedDate: Date;
    selectedRouteId: number;
    onItemSelect: (id: number) => void;
    setTripAdded: (value: boolean) => void; 
    tripAdded: boolean;
}
const ListTrip: React.FC<ListTripProps> = ({ companyId, selectedDate, selectedRouteId, onItemSelect, setTripAdded, tripAdded  }) => {
    const formattedDateTrip = dayjs(selectedDate).format('YYYY-MM-DD');
    const { trips, loading, error, refetch } = useListTrip(companyId, formattedDateTrip, selectedRouteId);
    useEffect(() => {
        if (tripAdded) {
            refetch(); 
            setTripAdded(false); // Reset lại tripAdded sau khi refetch
        }
    }, [tripAdded, refetch, setTripAdded]);
    if (loading) return <div><LoadingIndicator /></div>;
    if (error) return <div><LoadingIndicator /></div>;
    return (
        <>
            <div className="grid grid-cols-7 gap-1 mt-0 px-2">
                {Array.isArray(trips) && trips.length > 0 ? (
                    trips
                        .sort((a, b) => {
                            return a.time.localeCompare(b.time);
                        })
                        .map((trip, index) => (
                            <div key={index} className="grid grid-cols-auto-fit min-w-[160px] gap-2 p-1 w-full">
                                <div className="bg-white flex flex-col border border-gray-400 rounded-md justify-between relative min-w-[160px] shadow-md cursor-pointer" onClick={() => onItemSelect(trip.id)}>
                                    <div className="w-full bg-gray-200 h-[33px] rounded-t-md relative">
                                        <div className="flex justify-between w-full">
                                            <span className="ml-1 font-bold text-lg text-left">{trip.time.slice(0, 5)}</span>
                                            <span className="mr-1 font-bold text-lg text-right">24/36</span>
                                        </div>
                                        <div className="absolute top-0 left-0 h-full bg-green-500 z-[-1] w-[50%]"></div>
                                    </div>
                                    <div className="flex flex-wrap flex-col font-medium text-sm leading-none text-[#232731]">
                                        <p>
                                            <span>T: {trip.user ? trip.user.join(', ') : ''}</span>
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end px-1">
                                        <span className="font-medium text-base leading-5 tracking-tighter text-[#383f47] whitespace-nowrap">
                                            {trip.licensePlate}
                                        </span>
                                        <span className="font-medium text-base leading-5 tracking-tighter text-[#383f47] whitespace-nowrap">
                                            {trip.seatMapName}
                                        </span>
                                    </div>


                                </div>
                            </div>
                        ))
                ) : (
                    <div >
                        Không có chuyến nào được tìm thấy.
                    </div>
                )}
            </div>
        </>
    );
};
export default ListTrip;
