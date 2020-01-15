import { useState, useEffect } from 'react';

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = () => {
    const setState = useState(globalState)[1];

    const dispatch = (actionIdentifier, payload) => {
        const newState = actions[actionIdentifier](globalState, payload);
        globalState = { ...globalState, ...newState };
    
        for (const listener of listeners) {
            listener(globalState);
        }
    };

    useEffect(() => {
        listeners.push(setState);

        return () => {
            listeners = listeners.filter(li => li !== setState);
        }
    }, [setState]);

    return [globalState, dispatch]
};

export const initStore = (userActions, initialState) => {
    if (initialState) {
        globalState = { ...globalState, ...initialState };
    }
    actions = { ...actions, ...userActions}
}

export const FORMAT_NUMBER = num => {
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
                case 6: 
                        int = (int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3));
                        break;
                case 5: 
                        int = (int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3));
                        break;
                case 4: 
                        int = (int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3));
                        break;
                default: 
                        int = numSplit[0];
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
}