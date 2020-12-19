import React, { useState, useEffect } from 'react';
import { TableOuterWrapper, TableHeadWrapper, ColumnHead, TableRowWrapper, TableRow, ColumnValue, EmptyCollection } from './OrderHistory.styled';
import FallbackUI from './FallbackUI';
import Constants from '../constants';
import { formatTimeWithMeridian } from '../utils/dateUtils';
import { getOrderStatus } from '../utils/apiUtils';

const OrderHistory = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [orderHistory, setOrderHistory] = useState(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (isLoading) {
            getOrderStatus()
                .then(response => response.json())
                .then(data => {
                    setIsLoading(false);
                    setOrderHistory(data);
                })
                .catch(() => {
                    setHasError(true);
                });
        }
    }, [isLoading, orderHistory])


    let ordersTable = null;

    if (orderHistory && !isLoading && !hasError) {
        if (orderHistory.orders.length === 0) {
            ordersTable = <EmptyCollection>{Constants.INFO_MESSAGES.EmptyCollection}</EmptyCollection>;
        }
        else {
            const sortedOrders = orderHistory.orders.sort((currentOrder, nextOrder) => {
                return new Date(currentOrder.arrives_at_utc) - new Date(nextOrder.arrives_at_utc);
            });

            const currentDateTime = Date.now();
            const tableColumns = ['Status', 'Date', 'Time', 'Order Number', 'Paid with'];
            const tableHead = tableColumns.map((column, index) => {
                return <ColumnHead key={index} size={column === 'Date' ? 2 : 1}>{column}</ColumnHead>
            });

            const tableRows = sortedOrders.map((order) => {
                const orderDateTime = order.arrives_at_utc && new Date(order.arrives_at_utc);

                const orderStatus = !order.arrives_at_utc
                    ? Constants.ORDER_STATUS.Cancelled
                    : orderDateTime < currentDateTime
                        ? Constants.ORDER_STATUS.Delivered
                        : Constants.ORDER_STATUS.Confirmed;

                const day = orderDateTime && Constants.WEEKDAY_NAMES[orderDateTime.getDay()];
                const date = orderDateTime && `${orderDateTime.getDate()}/${orderDateTime.getMonth() + 1}/${orderDateTime.getFullYear()}`
                const formattedDate = orderDateTime ? `${day}, ${date}` : '-';
                const formattedTime = orderDateTime ? formatTimeWithMeridian(orderDateTime) : '-';

                // additional styles
                const statusColor = orderStatus === Constants.ORDER_STATUS.Cancelled
                    ? Constants.THEME_SETTING.StatusCancelledColor
                    : orderStatus === Constants.ORDER_STATUS.Delivered
                        ? Constants.THEME_SETTING.StatusDeliveredColor
                        : Constants.THEME_SETTING.StatusConfirmedColor;

                const paidWithColor = order.paid_with === Constants.PAID_WITH.Prime ? Constants.THEME_SETTING.PaidWithPrimeColor : Constants.THEME_SETTING.PaidWithDefaultColor;


                return (
                    <TableRow key={order.order_id}>
                        <ColumnValue size={1} style={{ color: statusColor }}>{orderStatus}</ColumnValue>
                        <ColumnValue size={2}>{formattedDate}</ColumnValue>
                        <ColumnValue size={1} style={{ fontWeight: 'bold' }}>{formattedTime}</ColumnValue>
                        <ColumnValue size={1} style={{ color: Constants.THEME_SETTING.OrderNumberColor }}>#{order.order_id}</ColumnValue>
                        <ColumnValue size={1} style={{ color: paidWithColor }}>{order.paid_with}</ColumnValue>
                    </TableRow>);
            })

            ordersTable =
                <TableOuterWrapper>
                    <TableHeadWrapper>
                        {tableHead}
                    </TableHeadWrapper>
                    <TableRowWrapper>
                        {tableRows}
                    </TableRowWrapper>
                </TableOuterWrapper>;
        }
    }


    return (
        <>
            {hasError
                ? <FallbackUI content={Constants.ERROR_MESSAGES.Fallback} />
                : ordersTable
            }
        </>
    );
}

export default OrderHistory;