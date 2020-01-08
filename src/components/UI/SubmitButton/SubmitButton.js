import React from 'react';
// import { useStore } from '../../../store/store';
import classes from './SubmitButton.module.css';

const SubmitButton = props => {

    // const [state, dispatch] = useStore();

    // let submitHandler = () => {
    //     if (props.type === 'budget') {
    //         dispatch('UPDATE_BUDGET_VALUE');
    //         dispatch('TOGGLE_BUDGET_DRAWER');
    //     } else if (props.type === 'gift') {
    //         let who = document.getElementById('whoInput');
    //         let what = document.getElementById('whatInput');
    //         let where = document.getElementById('whereInput');
    //         let price = document.getElementById('priceInput');
    //         let payload = {
    //             who: who.value,
    //             what: what.value,
    //             where: where.value,
    //             price: price.value
    //         }
    //         if ( who.value && what.value && where.value && price.value) {
    //             if( price.value > 0) {
    //                 dispatch('ADD_GIFT', payload);
    //                 dispatch('TOGGLE_GIFT_DRAWER');
    //             } else {
    //                 dispatch('ERROR_NUMBER_FORMAT');
    //             }          
    //         } else {
    //             dispatch('ERROR_ALL_FIELDS');
    //         }
    //     }
    // }

    let text = props.type === 'budget' ? 'Set Budget' : 'Add Gift';
    let icon = props.type === 'budget' ? null : <i className="fas fa-plus"></i>;

    return <button className={classes.SubmitButton} onClick={props.clicked}>{text} {icon}</button>;
}

export default SubmitButton;