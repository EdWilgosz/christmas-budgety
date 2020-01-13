import React from 'react';
import { useStore } from '../../store/store';
import firebase from 'firebase/app';
import 'firebase/auth';

import Input from '../../components/UI/Input/Input';
import SubmitButton from '../../components/UI/SubmitButton/SubmitButton';
import Error from '../../components/Error/Error';
import classes from './InputDrawer.module.css';


const InputDrawer = props => {

    const [state, dispatch] = useStore();

    let submitHandler = e => {
        e.preventDefault();
        if (props.inputType === 'budget') {
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
        } else if (props.inputType === 'gift') {
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

    let createAccount = e => {
        e.preventDefault();
        let email = document.getElementById('emailInput');
        let password = document.getElementById('passwordInput');
        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then(() => {
            email.value = '';
            password.value = '';
        })
        .catch(error => {
            email.value = '';
            password.value = '';
            dispatch('ERROR_LOGIN', error.message)
        });
    }

    let login = e => {
        e.preventDefault();
        let email = document.getElementById('emailInput');
        let password = document.getElementById('passwordInput');
        firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then(() => {
            email.value = '';
            password.value = '';
            setTimeout(() => {
                firebase.auth().signOut();
            }, 1800 * 1000);
        })
        .catch(error => {
            email.value = '';
            password.value = '';
            dispatch('ERROR_LOGIN', error.message)
        });
    }

    let toggleCreateAccount = e => {
        e.preventDefault();
        dispatch('TOGGLE_LOGIN_CREATE_ACCOUNT');
    }

    let logout = e => {
        e.preventDefault();
        console.log('signout');
        firebase.auth().signOut();
    }

    let loginForm = <div className={classes.InputDrawer}>
                        <div className={classes.TitleBar}>Please login to continue</div>
                        <Input type={'email'} placeholder={'Enter your email'} inputType="emailInput"/>
                            <div className={classes.Break}></div>
                        <Input type={'password'} placeholder={'Enter your password'} inputType="passwordInput"/>
                            <div className={classes.Break}></div>
                        {state.error ? <Error errorMessage={state.errorMessage} /> : null }
                            <div className={classes.Break}></div>
                        <SubmitButton inputType="login" clicked={e=>login(e)} /> 
                            <div className={classes.Or}>or</div>
                        <SubmitButton inputType="createAccount" clicked={e=>toggleCreateAccount(e)} /> 
                    </div>; 
                    
    let createAccountForm = <div className={classes.InputDrawer}>
                                <div className={classes.TitleBar}>Please create an account to continue</div>
                                <Input type={'email'} placeholder={'Enter your email'} inputType="emailInput"/>
                                    <div className={classes.Break}></div>
                                <Input type={'password'} placeholder={'Enter a new password'} inputType="passwordInput"/>
                                    <div className={classes.Break}></div>
                                {state.error ? <Error errorMessage={state.errorMessage} /> : null }
                                    <div className={classes.Break}></div>
                                <SubmitButton inputType="createAccount" clicked={e=>createAccount(e)} /> 
                                    <div className={classes.Or}>or</div>
                                <SubmitButton inputType="login" clicked={e=>toggleCreateAccount(e)} /> 
                            </div>;
    
    let inputs = props.inputType === 'login' ? 
            loginForm : 
                props.inputType === 'createAccount' ?
                    createAccountForm :
                        props.inputType === 'budget' ? 
                            <div className={classes.InputDrawer}>
                                <Input type={'text'} placeholder={'Enter budget'} inputType="budgetInput"/>
                                <div className={classes.Break} />
                                {state.error ? <Error errorMessage={state.errorMessage} /> : null }
                                <div className={classes.Break} />
                                <SubmitButton inputType={props.inputType} clicked={e=>submitHandler(e)} />
                                <button className={classes.Logout} onClick={e=>logout(e)}>Logout</button> 
                            </div> : 
                            <div className={classes.InputDrawer}>
                                <Input type={'text'} placeholder={'Who\'s it for?'} inputType="whoInput" />
                                <Input type={'text'} placeholder={'What is it?'} inputType="whatInput"/>
                                <Input type={'text'} placeholder={'Where to get it?'} inputType="whereInput" />
                                <Input type={'text'} placeholder={'How much is it?'}  inputType="priceInput"/>
                                {state.error ? <Error errorMessage={state.errorMessage}/> : null }
                                <div className={classes.Break} />
                                <SubmitButton inputType={props.inputType} clicked={e=>submitHandler(e)} />
                                <button className={classes.Logout} onClick={e=>logout(e)}>Logout</button> 
                            </div>;

    




    return inputs;

}

export default InputDrawer;