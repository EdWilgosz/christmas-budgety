import React from 'react';
import { useStore, FORMAT_NUMBER } from '../../store/store';
import firebase from 'firebase/app';
import 'firebase/database';

import GiftTitleBar from '../../components/UI/GiftTitleBar/GiftTitleBar';
import GiftItem from '../../components/UI/GiftItem/GiftItem';
import BoughtItem from '../../components/UI/BoughtItem/BoughtItem';

const Bottom = () => {

    const [state, dispatch] = useStore();

    if (state.isLoggedIn) {
        const database = firebase.database();
        const userId = state.userId;

        database.ref(userId).once('value', snapshot => snapshot)
            .then(snapshot => {
                const giftList = [];
                const boughtList = [];
                let budgetValue;
                let toSpendValue = 0;
                let spentValue = 0;
                let toSpendPerc;
                let spentPerc;
                if(snapshot.val()) {
                const toPurchase = snapshot.val().toPurchase;
                const purchased = snapshot.val().purchased;
                for (let each in toPurchase) {
                    const id = toPurchase[each].id;
                    const who = toPurchase[each].who.toUpperCase();
                    const what = toPurchase[each].what.toUpperCase();
                    const where = toPurchase[each].where.toUpperCase();
                    const price = toPurchase[each].price;
                    const newGift = [id, who, what, where, price];
                    giftList.push(newGift);
                    spentValue = parseFloat(spentValue) + parseFloat(price);
                }
                for (let each in purchased) {
                    const id = purchased[each].id;
                    const who = purchased[each].who.toUpperCase();
                    const what = purchased[each].what.toUpperCase();
                    const where = purchased[each].where.toUpperCase();
                    const price = purchased[each].price;
                    const boughtGift = [id, who, what, where, price];
                    boughtList.push(boughtGift);
                    spentValue = parseFloat(spentValue) + parseFloat(price);
                }
                budgetValue = (snapshot.val().budget) ? parseFloat(snapshot.val().budget.budgetValue.value) : 0.00;
                toSpendValue = budgetValue - spentValue;
                spentPerc = Math.round((spentValue / budgetValue) * 100);
                toSpendPerc = Math.round((toSpendValue / budgetValue)*100);


            }
                return [giftList, boughtList, budgetValue, spentValue, toSpendValue, spentPerc, toSpendPerc];
            })
            .then(val => {
                if(state.giftList.toString() !== val[0].toString() || state.boughtList.toString() !== val[1].toString() || state.budgetValue !== val[2]) {
                    dispatch('UPDATE_LISTS', [val[0], val[1], val[2], val[3], val[4], val[5], val[6]]);
                } 
            })
    }

        
    const check = e => {
        const curGift = e.target.closest('div').parentNode;
        const id = curGift.id;
        const selected = [...state.giftList].filter(cur => id === cur[0]);
        const payload = {
            id: selected[0][0],
            who: selected[0][1],
            what: selected[0][2],
            where: selected[0][3],
            price: selected[0][4],
            isLoggedIn: false
        }
        curGift.style.opacity = '0';
        setTimeout(() => {
            dispatch('CHECK_GIFT', payload);
        }, 750);
        
    }

    const uncheck = e => {

        const curBoughtItem = e.target.closest('div').parentNode;
        const id = curBoughtItem.id;
        const selected = [...state.boughtList].filter(cur => id === cur[0]);
        const payload = {
            id: selected[0][0],
            who: selected[0][1],
            what: selected[0][2],
            where: selected[0][3],
            price: selected[0][4]
        }
        curBoughtItem.style.opacity = '0';
        setTimeout(() => {
            dispatch('UNCHECK_GIFT', payload);
        }, 750);
        
    }

    const remove = e => {
        const item = e.target.closest('div').parentNode;
        const id = item.id;
        item.style.opacity = '0';
        setTimeout(() => {
            dispatch('REMOVE_GIFT', id);
        }, 750);
        
    }

    const removeBoughtItem = e => {
        const item = e.target.closest('div').parentNode;
        const id = item.id;
        item.style.opacity = '0';
        setTimeout(() => {
            dispatch('REMOVE_BOUGHT_ITEM', id);
        }, 750);
    }

    const gifts = state.giftList.map(cur => <GiftItem key={cur[0]} id={cur[0]} who={cur[1]} what={cur[2]} where={cur[3]} price={FORMAT_NUMBER(cur[4])} check={e=>check(e)} removeGift={e=>remove(e)}/>);
    const boughtGifts = state.boughtList.map(cur => <BoughtItem key={cur[0]} id={cur[0]} who={cur[1]} what={cur[2]} where={cur[3]} price={FORMAT_NUMBER(cur[4])} uncheck={e=>uncheck(e)} removeBoughtItem={e=>removeBoughtItem(e)}/>);
    const titleBar = state.boughtList.length > 0 ? <GiftTitleBar /> : null

    return (

        <React.Fragment>
            {gifts}
            {titleBar}
            {boughtGifts}
        </React.Fragment>
    );
}

export default Bottom;
