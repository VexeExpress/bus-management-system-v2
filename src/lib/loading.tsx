import React from 'react';
import { CircularProgress } from '@mui/material';
import '@/styles/css/global.css'

const LoadingIndicator: React.FC = () => {
    return (
        <div className='loaderContainer'>
            <CircularProgress size="5rem" />
        </div>
    );
};

export default LoadingIndicator;