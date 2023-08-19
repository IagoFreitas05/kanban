import {Order} from '../../types/Order';
import {OrdersBoard} from '../OrdersBoard';
import {Container} from './styles';
import {useEffect, useState} from 'react';
import {api} from '../../utils/api.ts';
import socketIo from "socket.io-client";
import {toast} from 'react-toastify';

export function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const socket = socketIo("http://localhost:3001",{
            transports:["websocket"],
        });

        socket.on("orders@new", (order : Order) => {
            setOrders(prevState => prevState.concat(order));
            toast.success(`Novo pedido na mesa ${order.table}`);
        });

    }, []);

    useEffect(() => {
        api.get('/orders').then(({data}) => {
            setOrders(data);
        });
    }, []);

    const waiting = orders.filter((order) => order.status === 'WAITING');
    const inProduction = orders.filter((order) => order.status === 'IN_PRODUCTION');
    const done = orders.filter((order) => order.status === 'DONE');

    function handleCancelOrder(orderId: string) {
        setOrders((prevState) => prevState.filter(order => order._id !== orderId));
    }

    function handleOrderStatusChange(orderId: string, status: Order['status']) {
        setOrders((prevState) => prevState.map((order) => (
            order._id === orderId
                ? {...order, status}
                : order
        )));
    }

    return (
        <Container>
            <OrdersBoard
                icon="🕒"
                title="ToDo"
                orders={waiting}
                onCancelOrder={handleCancelOrder}
                onChangeOrderStatus={handleOrderStatusChange}
            />
            <OrdersBoard
                icon="👨🏻‍🍳"
                title="Doing"
                orders={inProduction}
                onCancelOrder={handleCancelOrder}
                onChangeOrderStatus={handleOrderStatusChange}
            />
            <OrdersBoard
                icon="✅"
                title="Done"
                orders={done}
                onCancelOrder={handleCancelOrder}
                onChangeOrderStatus={handleOrderStatusChange}
            />
        </Container>
    );
}
