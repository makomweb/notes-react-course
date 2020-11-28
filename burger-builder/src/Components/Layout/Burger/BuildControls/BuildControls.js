import React from 'react';
import BuildControl from './BuildControl/BuildControl.js';
import classes from './BuildControls.css';

const controls = [
    { label: 'Lettuce', type: 'lettuce' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Beef', type: 'beef' }
];

const BuildControls = props => {

    return (
        <div className={classes.BuildControls}>
            {
                controls.map(c => {
                    return <BuildControl
                        key={c.label}
                        label={c.label} />;
                })
            }
        </div>
    );
}

export default BuildControls;