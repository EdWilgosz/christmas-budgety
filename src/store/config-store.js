// import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import { initStore } from './store';

const configureStore = () => {
    const actions = {
        TOGGLE_BUDGET_DRAWER: curState => {
            if (curState.budgetDrawer) {
                return {
                    showDrawer: false,
                    budgetDrawer: false,
                    giftDrawer: false,
                    error: false,
                    errorMessage: ''
                }
            } else {
                return {
                    showDrawer: true,
                    budgetDrawer: true,
                    giftDrawer: false,
                    error: false,
                    errorMessage: ''
                }
            }
        },
        TOGGLE_GIFT_DRAWER: curState => {
            if (curState.giftDrawer) {
                return {
                    showDrawer: false,
                    budgetDrawer: false,
                    giftDrawer: false,
                    error: false,
                    errorMessage: ''
                }
            } else {
                return {
                    showDrawer: true,
                    budgetDrawer: false,
                    giftDrawer: true,
                    error: false,
                    errorMessage: ''
                }
            }
        },
        TOGGLE_LOGIN: curState => {
            if (curState.showDrawer) {
                return {
                    showDrawer: false,
                    budgetDrawer: false,
                    giftDrawer: false,
                    error: false,
                    errorMessage: '',
                    sentAuth: true
                }
            } else {
                return {
                    showDrawer: true,
                    budgetDrawer: false,
                    giftDrawer: false,
                    error: false,
                    errorMessage: '',
                    sentAuth: true
                }
            }
        },
        UPDATE_BUDGET_VALUE: (curState, payload) => {
            let value = payload.budgetInput;
            if (curState.budget !== value) {
                let value = payload.budgetInput;
                const database = firebase.database();
                const userId = 555;
                let budgetValueRef = database.ref(`${userId}/budget/budgetValue`);

                // let budgetValueRef = toPurchase.push();
                budgetValueRef.set({
                    value
                });

                return { budgetValue: value};
            }

            
        },
        ADD_GIFT: (curState, payload) => {
            const database = firebase.database();
            const userId = 555;
            let toPurchase = database.ref(`${userId}/toPurchase`);

            let toPurchaseRef = toPurchase.push();
            toPurchaseRef.set({
                id: toPurchaseRef.key,
                who: payload.who,
                what: payload.what,
                where: payload.where,
                price: payload.price
            })
        },
        REMOVE_GIFT: (curState, payload) => {
            const database = firebase.database();
            const userId = 555;
            let toPurchaseRef = database.ref(`${userId}/toPurchase/${payload}`);
            toPurchaseRef.set(null);
        },
        REMOVE_BOUGHT_ITEM: (curState, payload) => {
            const database = firebase.database();
            const userId = 555;
            let purchasedRef = database.ref(`${userId}/purchased/${payload}`);
            purchasedRef.set(null);
        },
        CHECK_GIFT: (curState, payload) => {
            const userId = 555;
            const database = firebase.database();
            let toPurchaseRef = database.ref(`${userId}/toPurchase/${payload.id}`);
            toPurchaseRef.set(null);

            let purchased = database.ref(`${userId}/purchased`);
            let purchasedRef = purchased.push();
            purchasedRef.set({
                id: purchasedRef.key,
                who: payload.who,
                what: payload.what,
                where: payload.where,
                price: payload.price
            })
        },
        UNCHECK_GIFT: (curState, payload) => {
            const userId = 555;
            const database = firebase.database();
            let purchasedRef = database.ref(`${userId}/purchased/${payload.id}`);
            purchasedRef.set(null);

            let toPurchase = database.ref(`${userId}/toPurchase`);
            let toPurchaseRef = toPurchase.push();
            toPurchaseRef.set({
                id: toPurchaseRef.key,
                who: payload.who,
                what: payload.what,
                where: payload.where,
                price: payload.price
            })
        },
        ERROR_NUMBER_FORMAT: (curState, payload) => {
            return {
                error: true,
                errorMessage: payload.errorMessage
            }
        },
        ERROR_ALL_FIELDS: (curState, payload) => {
            return {
                error: true,
                errorMessage: payload.errorMessage
            }
        },
        ERROR_LOGIN: (curState, payload) => {
            return {
                error: true,
                errorMessage: payload
            }
        },
        UPDATE_LISTS: (curState, payload) => {
            return { 
                budgetValue: payload[2],
                spentValue: payload[3],
                toSpendValue: payload[4],
                spentPerc: payload[5],
                toSpendPerc: payload[6],
                giftList: payload[0],
                boughtList: payload[1]
            } 
        },
        TOGGLE_LOGIN_CREATE_ACCOUNT: (curState, payload) => {
            return {
                login: !curState.login,
                error: false,
                errorMessage: ''
            }
        },
        LOGGED_IN: (curState, payload) => {
            if (curState.userId !== payload) {
                return {
                error: false,
                errorMessage: '',
                isLoggedIn: true,
                userId: payload,
                showDrawer: false
                }
            } 
        },
        LOGGED_OUT: (curState, payload) => {
            if (curState.isLoggedIn) {
                return {
                    budgetValue: 0.00,
                    spentValue: 0.00,
                    toSpendValue: 0.00,
                    spentPerc: 0,
                    toSpendPerc: 0,
                    showDrawer: false,
                    budgetDrawer: false,
                    giftDrawer: false,
                    error: false,
                    errorMessage: '',
                    giftList: [],
                    boughtList: [],
                    login: true,
                    isLoggedIn: false,
                    userId: null
                }
            }    
        }
    }    

    initStore(actions, {
        budgetValue: 0.00,
        spentValue: 0.00,
        toSpendValue: 0.00,
        spentPerc: 0,
        toSpendPerc: 0,
        showDrawer: false,
        budgetDrawer: false,
        giftDrawer: false,
        error: false,
        errorMessage: '',
        giftList: [],
        boughtList: [],
        login: true,
        isLoggedIn: false,
        userId: null
    });
}

export default configureStore;
