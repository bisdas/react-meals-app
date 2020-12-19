import Constants from '../constants';

export const getOrderStatus = () => {
    try {
        return fetch(Constants.ORDER_STATUS_API_URL.Staging);
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}
