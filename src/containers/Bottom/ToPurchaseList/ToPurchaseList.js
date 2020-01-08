import React, { useEffect } from 'react';
import { useStore } from '../../../store/store';
import firebase from 'firebase/app';
import 'firebase/database';

const ToPurchaseList = props => {

    // const [state, dispatch] = useStore();
    
    // let giftList = [];
    // let displayGifts = [];

    // useEffect(() => {
    //     const database = firebase.database();

    //     let newList = database.ref(`toPurchase/555`).once('value', snapshot => {
    //         snapshot.forEach(childSnapshot => {
    //             let newGift = {
    //                 id: childSnapshot.val().id,
    //                 who: childSnapshot.val().who,
    //                 what: childSnapshot.val().what,
    //                 where: childSnapshot.val().where,
    //                 price: childSnapshot.val().price
    //             };
    //             giftList.push(newGift);
    //         })
    //         return giftList;
    //     })
    //     .then(val => {
    //         if (giftList !== state.giftList) {
    //             // console.log(giftList)
    //             dispatch('UPDATE_GIFT_LIST', giftList);
    //             return giftList;
    //         }
    //     })
    //     .then((giftList) => {
    //         // console.log(giftList)
    //         return displayGifts = giftList.map(gift => {
    //             // console.log(gift);
    //         return <div>{`${gift.id} ${gift.who} ${gift.where} ${gift.what} ${gift.price}`}</div>;
    //         })

    //     })

    // }, []);

    const [state, dispatch] = useStore();
    
    let giftList = [];
    let displayGifts = [];

    useEffect(() => {
        const database = firebase.database();

        let newList = database.ref(`toPurchase/555`).once('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                let id = childSnapshot.val().id;
                let who = childSnapshot.val().who;
                let what = childSnapshot.val().what;
                let where = childSnapshot.val().where;
                let price = childSnapshot.val().price;
                let newGift = <div key={id} id={id}>{`${id} ${who} ${where} ${what} ${price}`}</div>;
                giftList.push(newGift);
            })
            // console.log(giftList)
            return giftList;
        })
        .then(val => {
            if (giftList !== state.giftList) {
                // console.log(giftList)
                dispatch('UPDATE_GIFT_LIST', giftList);
                return giftList;
            }
        })
        // .then((giftList) => {
        //     // console.log(giftList)
        //     // return displayGifts = giftList.map(gift => {
        //     //     // console.log(gift);
        //     // return <div>{`${gift.id} ${gift.who} ${gift.where} ${gift.what} ${gift.price}`}</div>;
        //     // })

        // })

    }, []);
        
    

    let log = () => {
        console.log(state.giftList);
    }

    return (
        <div>
        <h1>{state.giftList.map(cur => cur)}</h1>
        <button onClick={log}>LOG</button>
        
        </div>
    );
}

export default ToPurchaseList;