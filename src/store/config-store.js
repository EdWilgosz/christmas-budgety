import { initStore } from './store';

const configureStore = () => {
    const actions = {
        TOGGLE_BUDGET_DRAWER: (curState) => {
            if (curState.budgetDrawer) {
                return {
                    showDrawer: false,
                    budgetDrawer: false,
                    giftDrawer: false
                }
            } else {
                return {
                    showDrawer: true,
                    budgetDrawer: true,
                    giftDrawer: false
                }
            }
        },
        TOGGLE_GIFT_DRAWER: (curState) => {
            if (curState.giftDrawer) {
                return {
                    showDrawer: false,
                    giftDrawer: false,
                    budgetDrawer: false
                }
            } else {
                return {
                    showDrawer: true,
                    giftDrawer: true,
                    budgetDrawer: false
                }
            }
        }

    }

    initStore(actions, {
        showDrawer: false,
        budgetDrawer: false,
        giftDrawer: false
    });
}

export default configureStore;
