import React from 'react';

const LoadingSpinner = () => {
    return (
        <div class="animate-spin inline-block w-32 h-32 border-[10px] border-current border-t-transparent text-primary rounded-full" role="status" aria-label="loading">
            <span class="sr-only">Loading...</span>
        </div>
    );
};

export default LoadingSpinner;