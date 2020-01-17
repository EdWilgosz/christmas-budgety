import React from 'react';
import { useStore } from '../../store/store';
import classes from './InputDrawer.module.css';

import Input from '../../components/UI/Input/Input';
import SubmitButton from '../../components/UI/SubmitButton/SubmitButton';
import Error from '../../components/Error/Error';


const InputDrawer = props => {

    const [state, dispatch] = useStore();

    const submitHandler = e => {
        e.preventDefault();
        if (props.inputType === 'budget') {
            const budgetInput = document.getElementById('budgetInput');
            const value = budgetInput.value;
            if (value > 0) {
                const payload = { budgetInput: value };
                dispatch('UPDATE_BUDGET_VALUE', payload);
                dispatch('TOGGLE_BUDGET_DRAWER');
            } else {
                const payload = { errorMessage: 'please enter a valid usd price format (example: 12.00 or 12)' };
                dispatch('ERROR_NUMBER_FORMAT', payload);
            }
        } else if (props.inputType === 'gift') {
            const who = document.getElementById('whoInput').value;
            const what = document.getElementById('whatInput').value;
            const where = document.getElementById('whereInput').value;
            const price = document.getElementById('priceInput').value;
            const payload = {
                who: who,
                what: what,
                where: where,
                price: price
            }
            if ( who && what && where && price) {
                if( price > 0) {
                    dispatch('ADD_GIFT', payload);
                    dispatch('TOGGLE_GIFT_DRAWER');
                } else {
                    const payload = {
                        errorMessage: 'please enter a valid usd price format (example: 12.00 or 12)'
                    }
                    dispatch('ERROR_NUMBER_FORMAT', payload);
                }          
            } else {
                const payload = {
                    errorMessage: 'please fill in all fields'
                }
                dispatch('ERROR_ALL_FIELDS', payload);
            }
        }
    }

    let loginForm =         <div className={classes.InputDrawer}>
                                <div className={classes.TitleBar}>Please login to continue</div>
                                <Input type={'email'} placeholder={'Enter your email'} inputType="emailInput"/>
                                    <div className={classes.Break}></div>
                                <Input type={'password'} placeholder={'Enter your password'} inputType="passwordInput"/>
                                    <div className={classes.Break}></div>
                                {state.error ? <Error errorMessage={state.errorMessage} /> : null }
                                    <div className={classes.Break}></div>
                                <SubmitButton inputType="login" clicked={props.login} />
                                <div className={classes.LinkContainer}> 
                                    <div className={classes.Or}>Don't have an account? <span className={classes.Link} onClick={props.toggleCreateAccount}>Sign up</span></div>
                                    <div className={classes.Or}>Forgot your password? <span className={classes.Link} onClick={props.toggleResetPass}>Reset password</span></div>
                                </div> 
                                {/* <SubmitButton inputType="createAccount" clicked={props.toggleCreateAccount} />  */}
                            </div>; 
                    
    let createAccountForm = <div className={classes.InputDrawer}>
                                <div className={classes.TitleBar}>Please create an account to continue</div>
                                <Input type={'email'} placeholder={'Enter your email'} inputType="emailInput"/>
                                    <div className={classes.Break}></div>
                                <Input type={'password'} placeholder={'Enter a new password'} inputType="passwordInput"/>
                                    <div className={classes.Break}></div>
                                {state.error ? <Error errorMessage={state.errorMessage} /> : null }
                                    <div className={classes.Break}></div>
                                <SubmitButton inputType="createAccount" clicked={props.createAccount} />
                                <div className={classes.LinkContainer}> 
                                    <div className={classes.Or}>Have an account? <span className={classes.Link} onClick={props.toggleCreateAccount}>Log in</span></div>
                                    <div className={classes.Or}>Forgot your password? <span className={classes.Link} onClick={props.toggleResetPass}>Reset password</span></div>
                                </div>
                                    {/* <div className={classes.Or}>or</div>
                                <SubmitButton inputType="login" clicked={props.toggleCreateAccount} />  */}
                            </div>;

    let resetPassword =     <div className={classes.InputDrawer}>
                                <div className={classes.ResetPassTitle} id='resetPassTitle'><div style={{display: 'inline-block'}}>An email with a password</div> <div style={{display: 'inline-block'}}>reset link has been sent!</div></div>
                                <Input type={'email'} placeholder={'Enter your email'} inputType="emailInput"/>
                                    <div className={classes.Break}></div>
                                {state.error ? <Error errorMessage={state.errorMessage} /> : null }
                                    <div className={classes.Break}></div>
                                <SubmitButton inputType="resetPass" clicked={props.resetPassword} />
                                <div className={classes.LinkContainer}> 
                                    <div className={classes.Or}>Back to <span className={classes.Link} onClick={props.toggleResetPass}>Log in</span></div>
                                </div>
                            </div>

    let budget =            <div className={classes.InputDrawer}>
                                <Input type={'text'} placeholder={'Enter Budget'} inputType="budgetInput" maxLength="5"/>
                                    <div className={classes.Break} />
                                {state.error ? <Error errorMessage={state.errorMessage} /> : null }
                                    <div className={classes.Break} />
                                <SubmitButton inputType={props.inputType} clicked={e=>submitHandler(e)} />
                                <button className={classes.Logout} onClick={props.logout}>Logout</button> 
                            </div>;

    let gift =              <div className={classes.InputDrawer}>
                                <Input type={'text'} placeholder={'Who\'s it for?'} inputType="whoInput" />
                                <Input type={'text'} placeholder={'What is it?'} inputType="whatInput"/>
                                <Input type={'text'} placeholder={'Where to get it?'} inputType="whereInput" />
                                <Input type={'text'} placeholder={'How much is it?'}  inputType="priceInput"/>
                                {state.error ? <Error errorMessage={state.errorMessage}/> : null }
                                    <div className={classes.Break} />
                                <SubmitButton inputType={props.inputType} clicked={e=>submitHandler(e)} />
                                <button className={classes.Logout} onClick={props.logout}>Logout</button> 
                            </div>;
    
    let inputs = props.inputType === 'resetPass' ?
            resetPassword :
                props.inputType === 'login' ? 
                    loginForm : 
                        props.inputType === 'createAccount' ?
                            createAccountForm :
                                props.inputType === 'budget' ? 
                                    budget : 
                                    props.inputType === 'gift' ?
                                        gift : null;

    return inputs;
}

export default InputDrawer;