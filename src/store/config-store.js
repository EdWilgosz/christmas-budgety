// import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
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
        boughtList: []
    });
}

export default configureStore;
