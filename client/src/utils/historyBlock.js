import React from "react";
import { Table } from "react-bootstrap";
import Moment from "react-moment";

const HistoryBlock = ({history})=>{
    
    return <>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Products</th>
                    <th>Amount Paid</th>
                    <th>Order ID</th>
                </tr>
            </thead>
            <tbody>
                {history && history.map(item=>{
                    return <tr key={item[0].transactionId}>
                        <td><Moment to={item[0].date}></Moment></td>
                        <td>
                        {item[0].items && item[0].items.map((singleItem,i)=>(
                            <>
                            <div key={i}>
                                {singleItem.name}
                                </div>
                                <br/>
                            </>
                    
                            ))}
                        </td>
                        <td>{item[0].amount}</td>
                        <td>{item[0].orderId}</td>
                    </tr>
                })}
            </tbody>
        </Table>
    </>
}

export default HistoryBlock