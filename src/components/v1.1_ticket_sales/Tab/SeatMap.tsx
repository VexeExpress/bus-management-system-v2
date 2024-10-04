import React from 'react';
interface SeatMapProps {
    selectedItemId: number | null; 
}

const SeatMap: React.FC<SeatMapProps> = ({ selectedItemId }) => {
    return <div>Sơ đồ ghế content here, selected item ID: {selectedItemId}</div>;
};
export default SeatMap;