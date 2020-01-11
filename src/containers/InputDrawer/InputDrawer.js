import React from 'react';
import { useStore } from '../../store/store';
import Input from '../../components/UI/Input/Input';
import SubmitButton from '../../components/UI/SubmitButton/SubmitButton';
import Error from '../../components/Error/Error';
import classes from './InputDrawer.module.css';


const InputDrawer = props => {

    const [state, dispatch] = useStore();

    let submitHandler = () => {
        if (props.type === 'budget') {
            let budgetInput = document.getElementById('budgetInput');
            let value = budgetInput.value;
            if (value > 0) {
                let payload = { budgetInput: value };
                dispatch('UPDATE_BUDGET_VALUE', payload);
                dispatch('TOGGLE_BUDGET_DRAWER');
            } else {
                let payload = { errorMessage: 'please enter a valid usd price format (example: 12.00 or 12)' };
                dispatch('ERROR_NUMBER_FORMAT', payload);
            }
        } else if (props.type === 'gift') {
            let who = document.getElementById('whoInput');
            let what = document.getElementById('whatInput');
            let where = document.getElementById('whereInput');
            let price = document.getElementById('priceInput');
            let payload = {
                who: who.value,
                what: what.value,
                where: where.value,
                price: price.value
            }
            if ( who.value && what.value && where.value && price.value) {
                if( price.value > 0) {
                    dispatch('ADD_GIFT', payload);
                    dispatch('TOGGLE_GIFT_DRAWER');
                } else {
                    let payload = {
                        errorMessage: 'please enter a valid usd price format (example: 12.00 or 12)'
                    }
                    dispatch('ERROR_NUMBER_FORMAT', payload);
                }          
            } else {
                let payload = {
                    errorMessage: 'please fill in all fields'
                }
                dispatch('ERROR_ALL_FIELDS', payload);
            }
        }
    }


    let inputs = props.type === 'budget' ? 
        <div className={classes.InputDrawer}>
            <Input placeholder={'Enter budget'} type="budgetInput" />
            <div className={classes.Break} />
            {state.error ? <Error errorMessage={state.errorMessage} /> : null }
            <div className={classes.Break} />
            <SubmitButton type={props.type} clicked={submitHandler} /> 
        </div> : 
        <div className={classes.InputDrawer}>
            <Input placeholder={'Who\'s it for?'} type="whoInput" />
            <Input placeholder={'What is it?'} type="whatInput"/>
            <Input placeholder={'Where to get it?'} type="whereInput" />
            <Input placeholder={'How much is it?'}  type="priceInput"/>
            {state.error ? <Error errorMessage={state.errorMessage}/> : null }
            <div className={classes.Break} />
            <SubmitButton type={props.type} clicked={submitHandler} />
        </div>;


    return inputs;

}

export default InputDrawer;