import React from 'react';
import styles from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Lettuce', type: 'lettuce' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Patty', type: 'patty' }
];

const buildControls = (props) => (
    <div className={styles.BuildControls}>
        {
            controls.map(obj => (
                <BuildControl
                    key={obj.label}
                    label={obj.label}
                    added={() => props.ingredientAdded(obj.type)}
                    removed={() => props.ingredientRemoved(obj.type)} 
                    disabled={props.disabled[obj.type]}/>
            ))
        }
    </div>
);

export default buildControls;