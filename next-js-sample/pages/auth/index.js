import React from 'react';
import User from '../../components/User';

const authIndexPage = () => {
    return (
        <div>
            <h1>The auth page</h1>
            <User name="Paul" age={22} />
        </div>
    );
}

export default authIndexPage;