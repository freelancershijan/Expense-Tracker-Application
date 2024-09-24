import React from 'react';

const LoadingSpinner = () => {
    return (
        <div class="animate-spin inline-block size-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
        </div>
    );
};

export default LoadingSpinner;