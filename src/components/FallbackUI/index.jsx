import React from 'react';
import { Wrapper, Content } from './index.styled';

const OrderHistory = (props) => {
    return (
        <Wrapper>
            <Content>
                {props.content}
            </Content>
        </Wrapper>
    );
}

export default OrderHistory;