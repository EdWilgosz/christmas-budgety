import React from 'react';
import { useStore } from '../../store/store';
import firebase from 'firebase/app';
import 'firebase/auth';

import BudgetCont from '../BudgetCont/BudgetCont';
import ButtonBar from '../../components/UI/ButtonBar/ButtonBar';
import InputDrawer from '../InputDrawer/InputDrawer';

    const Top = () => {
        
        const [state, dispatch] = useStore();

        firebase.auth().onAuthStateChanged(user => {
            if (user && state.userId !== user.uid) {
                dispatch('LOGGED_IN', user.uid);
            } else if (!user && state.isLoggedIn) {
                dispatch('LOGGED_OUT');
            } 
        });

        const createAccount = e => {
            e.preventDefault();
            const email = document.getElementById('emailInput');
            const password = document.getElementById('passwordInput');
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
    
        const login = e => {
            e.preventDefault();
            const email = document.getElementById('emailInput');
            const password = document.getElementById('passwordInput');
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
    
        const toggleCreateAccount = e => {
            e.preventDefault();
            dispatch('TOGGLE_LOGIN_CREATE_ACCOUNT');
        }
    
        const logout = e => {
            e.preventDefault();
            firebase.auth().signOut();
        }

        const inputDrawer = 
            (state.showDrawer && !state.isLoggedIn && state.login) ? <InputDrawer inputType='login' login={e=>login(e)} toggleCreateAccount={e=>toggleCreateAccount(e)} /> :
            (state.showDrawer && !state.isLoggedIn && !state.login) ? <InputDrawer inputType='createAccount' createAccount={e=>createAccount(e)} toggleCreateAccount={e=>toggleCreateAccount(e)} /> :
            (state.showDrawer && state.budgetDrawer) ? <InputDrawer inputType='budget' logout={e=>logout(e)} /> :
            (state.showDrawer && state.giftDrawer) ? <InputDrawer inputType='gift' logout={e=>logout(e)} /> : null;

    return (
        <React.Fragment>
            <BudgetCont />
            <ButtonBar />
            {inputDrawer}
        </React.Fragment>
    );
}

export default Top;