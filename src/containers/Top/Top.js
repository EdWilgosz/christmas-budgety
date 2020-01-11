import React from 'react';
import { useStore } from '../../store/store';
import BudgetCont from '../BudgetCont/BudgetCont';
import ButtonBar from '../../components/UI/ButtonBar/ButtonBar';
import InputDrawer from '../InputDrawer/InputDrawer';

const Top = props => {

    const state = useStore()[0];

    let inputDrawer = () => {
        if (!state.showDrawer) {
            return null;
        } else if (state.showDrawer && state.budgetDrawer) {
            return <InputDrawer type='budget' />;
        } else if (state.showDrawer && state.giftDrawer) {
            return <InputDrawer type='gift' />
        }
    }


    return (
        <React.Fragment>
            <BudgetCont />
            <ButtonBar />
            {inputDrawer()}
        </React.Fragment>
    );
}

export default Top;





/*



<div class="top container-fluid">


<div class="row justify-content-between align-items-center px-1 px-sm-3">
    
    <div class="budget col-6 col-sm-6 py-3" id="budget">
        <div class="budget-value edit pt-1 pb-2 nw" title="Double-click to change">
            $1,000.00
        </div>
    </div>

    <div class="col-5 col-sm-5 align-items-center">

        <div class="budget-spent rounded row align-items-center py-1 my-1">
            <div class="budget-spent-text col-6 col-sm-7">
                Already <span class="nw">Spent<i class="fas fa-arrow-right pl-1 pl-sm-2"></i></span>
            </div>
            <div class="col-6 col-sm-5 text-left">
                <div class="budget-spent-value text-right nw">$567.98</div>
                <div class="budget-spent-percentage text-right nw">54%</div>
            </div>
        </div>

        <div class="budget-tospend rounded row align-items-center py-1 mb-1">
            <div class="budget-tospend-text col-6 col-sm-7">
                Left to <span class="nw">spend<i class="fas fa-arrow-right pl-1 pl-sm-2"></i></span>
            </div>
            <div class="col-6 col-sm-5 text-left">
                <div class="budget-tospend-value text-right nw">$456.78</div>
                <div class="budget-tospend-percentage text-right nw">46%</div>
            </div>
        </div>

    </div>

</div>


</div>



*/