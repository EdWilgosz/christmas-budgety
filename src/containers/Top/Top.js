import React from 'react';
import { useStore } from '../../store/store';

import firebase from 'firebase/app';
import 'firebase/auth';

import BudgetCont from '../BudgetCont/BudgetCont';
import ButtonBar from '../../components/UI/ButtonBar/ButtonBar';
import InputDrawer from '../InputDrawer/InputDrawer';


    const Top = props => {
        
        const [state, dispatch] = useStore();

        firebase.auth().onAuthStateChanged(user => {
            if (user && state.userId !== user.uid) {
                dispatch('LOGGED_IN', user.uid);
            } else if (!user && state.isLoggedIn) {
                dispatch('LOGGED_OUT');
            } 
        });

        let inputDrawer = !state.showDrawer ? null :
            (state.showDrawer && !state.isLoggedIn && state.login) ? <InputDrawer inputType='login' /> :
            (state.showDrawer && !state.isLoggedIn && !state.login) ? <InputDrawer inputType='createAccount' /> :
            (state.showDrawer && state.budgetDrawer) ? <InputDrawer inputType='budget' /> :
            (state.showDrawer && state.giftDrawer) ? <InputDrawer inputType='gift' /> : null;

    return (
        <React.Fragment>
            <BudgetCont />
            <ButtonBar />
            {/* {state.showDrawer ? inputDrawer : null} */}
            {inputDrawer}
        </React.Fragment>
    );
}

export default Top;