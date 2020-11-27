import React from 'react';

const WithClass = (WrappedComponent, className) => {
    return () => (
        <div className={className}>
            <WrappedComponent />
        </div>
    );
}

export default WithClass;