import styled from 'styled-components';
import Constants from './../constants';

export const TableOuterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 13px;
    font-family: Helvetica, Arial, sans-serif, 
    color: ${Constants.THEME_SETTING.TextDefaultColor}
`
export const TableHeadWrapper = styled.div`
    display: flex;
    flex-direction: row;
`
export const ColumnHead = styled.div`
    flex: ${props => props.size || 1};
    font-weight: 800;
    padding: 10px 8px
`

export const TableRowWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
export const TableRow = styled.div`
    display: flex;
    flex-direction: row;
    border-top: 1px solid #dedede;
`
export const ColumnValue = styled.div`
    flex: ${props => props.size || 1};
    padding: 10px 8px
`
export const EmptyCollection = styled.div`
    background: #d8d8d8;
    text-align: center;
    padding: 16px;
`

