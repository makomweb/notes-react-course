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
                    type={obj.type}
                    added={props.ingredientAdded} />
            ))
        }
    </div>
);

export default buildControls;