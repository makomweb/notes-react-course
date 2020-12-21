import React from 'react';
import Link from 'next/link';

const ShowError = props => {
    return (
        <div>
            <h1>Ooops, something went wrong!</h1>
            <p>Go to <Link href="/"><a>Going back</a></Link></p>
        </div>
    );
}

export default ShowError;