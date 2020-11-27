import React from 'react';

const WithClass = (WrappedComponent, className) => {
    return props => (
        <div className={className}>
            <WrappedComponent props={props} />
        </div>
    );
}

export default WithClass;