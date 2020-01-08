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
                let value = actions.FORMAT_NUMBER(payload.budgetInput);
                return { budgetValue: value};
            }
        },
        FORMAT_NUMBER: num => {
            let numSplit, int, dec;
    
            if (num > 0) {
    
                num = Math.abs(num);
                num = num.toFixed(2);
    
                numSplit = num.split('.');
    
                int = numSplit[0];
    
    
                if (int.length < 13) {
                    switch(int.length) {
                        case 12:
                                int = (int.substr(0, int.length - 9) + ',' + int.substr(int.length -9, 3) + ',' + int.substr(int.length -6, 3) + ',' + int.substr(int.length - 3, 3));
                                break;
                        case 11:
                                int = ((int.substr(0, int.length - 9) + ',' + int.substr(int.length -9, 3) + ',' + int.substr(int.length -6, 3) + ',' + int.substr(int.length - 3, 3)));
                                break;
                        case 10:
                                int = ((int.substr(0, int.length - 9) + ',' + int.substr(int.length -9, 3) + ',' + int.substr(int.length -6, 3) + ',' + int.substr(int.length - 3, 3)));
                                break;
                        case 9:
                                int = (int.substr(0, int.length - 6) + ',' + int.substr(int.length -6, 3) + ',' + int.substr(int.length - 3, 3));
                                break;
                        case 8:
                                int = (int.substr(0, int.length - 6) + ',' + int.substr(int.length -6, 3) + ',' + int.substr(int.length - 3, 3));
                                break;
                        case 7:
                                int = (int.substr(0, int.length - 6) + ',' + int.substr(int.length -6, 3) + ',' + int.substr(int.length - 3, 3));
                                break;
                        case 6: int = (int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3));
                                break;
                        case 5: int = (int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3));
                                break;
                        case 4: int = (int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3));
                                break;
                        default: int = numSplit[0];
                                break;
                    }
                } else {
                    int = 'YOUNEEDABIGGERCALCULATOR';
                }
    
                dec = numSplit[1];
    
            } else {
                int = '-';
                dec = '--';
            }
            
            return '$' + int + '.' + dec;
        },
        ADD_GIFT: (curState, payload) => {
            const database = firebase.database();
            const userId = 555;
            // console.log(`${payload.who} ${payload.what} ${payload.where} ${actions.FORMAT_NUMBER(payload.price)}`);
            let toPurchase = database.ref(`toPurchase/${userId}`);
            toPurchase.on('child_added', data => {
                // console.log(data.val().id + ' ' + data.val().who + ' ' + data.val().what + ' ' + data.val().where + ' ' + data.val().price );
            })

            let toPurchaseRef = toPurchase.push();
            toPurchaseRef.set({
                id: toPurchaseRef.key,
                who: payload.who,
                what: payload.what,
                where: payload.where,
                price: actions.FORMAT_NUMBER(payload.price)
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
        UPDATE_GIFT_LIST: (curState, payload) => {
            if (curState.giftList !== payload) {
                return { giftList: payload}
            }
        }

    }


        // const database = firebase.database();

        // let newList = database.ref(`toPurchase/555`).once('value', snapshot => {
        //     let giftList = [];
        //     snapshot.forEach(childSnapshot => {
        //         giftList.push(childSnapshot);
        //     })
        //     return giftList;
        // }).then(val => console.log(val.val())).then(()=> console.log('another then!'))
    

    initStore(actions, {
        budgetValue: '$1,200.00',
        showDrawer: false,
        budgetDrawer: false,
        giftDrawer: false,
        error: false,
        errorMessage: '',
        giftList: []
    });
}

export default configureStore;
