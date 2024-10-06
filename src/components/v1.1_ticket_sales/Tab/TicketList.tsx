import React from 'react';

const TicketList: React.FC = () => {
    return <div>Danh sách vé content here</div>;
};
export default TicketList;



//  {/* {seatMapData && (
//                     <div>
//                         <h2>{seatMapData.seatMapName}</h2>
//                         <p>Tầng: {seatMapData.floor}</p>
//                         <p>Số hàng: {seatMapData.row}, Số cột: {seatMapData.column}</p>

//                         {/* Sơ đồ ghế */}
//                         <div className="seat-map" style={{ display: 'flex' }}>
//                             {Array.from({ length: seatMapData.floor }).map((_, floorIndex) => (
//                                 <div key={floorIndex} className="floor-section" style={{ flexGrow: 1 }}>
//                                     {/* Hiển thị các hàng ghế cho từng tầng */}
//                                     {Array.from({ length: seatMapData.row }).map((_, rowIndex) => (
//                                         <div key={rowIndex} className="seat-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                             {Array.from({ length: seatMapData.column }).map((_, colIndex) => {
//                                                 // Tìm ghế tương ứng với hàng và cột
//                                                 const seat = seatMapData.seats.find(s => s.row === rowIndex + 1 && s.seatColumn === colIndex + 1 && s.floor === floorIndex + 1);
//                                                 return (
//                                                     <Card
//                                                         key={colIndex}
//                                                         variant="outlined"
//                                                         className={`seat ${seat ? (seat.status ? 'available' : 'booked') : 'empty'}`}
//                                                         style={{
//                                                             flex: '1', // The card takes up one part of the space
//                                                             height: 'auto',
//                                                             margin: '5px',
//                                                             display: 'flex',
//                                                             flexDirection: 'column', // Stack items vertically
//                                                             justifyContent: 'space-between', // Space between seat-info and seat-from-to
//                                                             alignItems: 'flex-start', // Align to the start of the card
//                                                             position: 'relative',
//                                                             cursor: 'pointer',
//                                                             padding: '10px' // Add padding to the card
//                                                         }}
//                                                     >
//                                                         <div className="seat-info" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
//                                                             <span className="seat-name" style={{ fontWeight: 'bold', marginRight: '10px' }}>
//                                                                 {seat ? seat.name : 'X'}
//                                                             </span>

//                                                             {seat && (
//                                                                 <div className='seat-phone' >
//                                                                     <span className="seat-status" >
//                                                                         {seat.phoneNumber || '0397892603'}
//                                                                     </span>
//                                                                 </div>
//                                                             )}
//                                                         </div>

//                                                         <div className='seat-from-to' style={{ marginTop: '10px', width: '100%' }}>
//                                                             <span style={{ display: 'inline-flex', alignItems: 'center' }}>
//                                                                 <LocationOn style={{ color: '#0072bc', width: '20px', marginRight: '5px' }} />
//                                                                 <span style={{ fontSize: '15px', color: 'rgb(35, 39, 49)' }}>Điểm đi</span>
//                                                             </span>
//                                                             <span style={{ display: 'inline-flex', alignItems: 'center' }}>
//                                                                 <LocationOn style={{ color: '#DD0000	', width: '20px', marginRight: '5px' }} />
//                                                                 <span style={{ fontSize: '15px', color: 'rgb(35, 39, 49)' }}>Điểm đến</span>
//                                                             </span>
//                                                         </div>
//                                                         <div className='seat-note'>
//                                                             <span>* dg, kèm 1 xe máy </span>
//                                                         </div>
//                                                         <div className="info-row">
//                                                             <span>TTTX</span>
//                                                             <span>200.000</span>
//                                                         </div>

//                                                         <div className="status-bar"></div>
//                                                         <div>
//                                                             <span style={{ fontSize: '13px', color: 'black' }}>B: Đặng Tuấn Thành/ VP An Sương</span>
//                                                         </div>
//                                                     </Card>

//                                                 );
//                                             })}
//                                         </div>
//                                     ))}
//                                 </div>
//                             ))}
//                         </div>

//                     </div>
//                 )} */}