import React from 'react';
import { useStore } from '../../store/store';
import firebase from 'firebase/app';
import 'firebase/database';

import GiftTitleBar from '../../components/UI/GiftTitleBar/GiftTitleBar';
import GiftItem from '../../components/UI/GiftItem/GiftItem';
import BoughtItem from '../../components/UI/BoughtItem/BoughtItem';

const Bottom = props => {

    const [state, dispatch] = useStore();

    const database = firebase.database();

    let update = database.ref('555').once('value', snapshot => snapshot)
        let updated = update.then(snapshot => {
            let giftList = [];
            let boughtList = [];
            if(snapshot.val()) {
            let toPurchase = snapshot.val().toPurchase;
            let purchased = snapshot.val().purchased;
            for (let each in toPurchase) {
                let id = toPurchase[each].id;
                let who = toPurchase[each].who.toUpperCase();
                let what = toPurchase[each].what.toUpperCase();
                let where = toPurchase[each].where.toUpperCase();
                let price = toPurchase[each].price.toUpperCase();
                let newGift = [id, who, what, where, price];
                giftList.push(newGift);
            }
            for (let each in purchased) {
                let id = purchased[each].id;
                let who = purchased[each].who.toUpperCase();
                let what = purchased[each].what.toUpperCase();
                let where = purchased[each].where.toUpperCase();
                let price = purchased[each].price.toUpperCase();
                let boughtGift = [id, who, what, where, price];
                boughtList.push(boughtGift);
            }
        }
            return [giftList, boughtList];
        })
        .then(val => {
            if(state.giftList.toString() !== val[0].toString() || state.boughtList.toString() !== val[1].toString()) {
                dispatch('UPDATE_LISTS', [val[0], val[1]]);
            } 
        })

        

    let check = e => {
        let curGift = e.target.closest('div').parentNode.id;
        let selected = [...state.giftList].filter(cur => curGift === cur[0]);
        let payload = {
            id: selected[0][0],
            who: selected[0][1],
            what: selected[0][2],
            where: selected[0][3],
            price: selected[0][4]
        }
        dispatch('CHECK_GIFT', payload);
    }

    let uncheck = e => {
        let curBoughtItem = e.target.closest('div').parentNode.id;
        let selected = [...state.boughtList].filter(cur => curBoughtItem === cur[0]);
        let payload = {
            id: selected[0][0],
            who: selected[0][1],
            what: selected[0][2],
            where: selected[0][3],
            price: selected[0][4]
        }
        dispatch('UNCHECK_GIFT', payload);
    }

    let remove = e => {
        const id = e.target.closest('div').parentNode.id;
        dispatch('REMOVE_GIFT', id);
    }

    let removeBoughtItem = e => {
        const id = e.target.closest('div').parentNode.id;
        dispatch('REMOVE_BOUGHT_ITEM', id);

    }

    let gifts = state.giftList.map(cur => <GiftItem key={cur[0]} id={cur[0]} who={cur[1]} what={cur[2]} where={cur[3]} price={cur[4]} check={e=>check(e)} removeGift={e=>remove(e)}/>);
    let boughtGifts = state.boughtList.map(cur => <BoughtItem key={cur[0]} id={cur[0]} who={cur[1]} what={cur[2]} where={cur[3]} price={cur[4]} uncheck={e=>uncheck(e)} removeBoughtItem={e=>removeBoughtItem(e)}/>);
    let titleBar = state.boughtList.length > 0 ? <GiftTitleBar /> : null

    return (

        <React.Fragment>
            {gifts}
            {titleBar}
            {boughtGifts}
        </React.Fragment>
    );
}

export default Bottom;
