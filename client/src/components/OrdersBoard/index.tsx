import {useState} from 'react';
import {Order} from '../../types/Order';
import {Board, OrdersContainer} from './style';
import {api} from '../../utils/api.ts';
import {toast} from 'react-toastify';
import {Card} from "../../types/Card.ts";

interface OrdersBoardProps {
    icon: string;
    title: string;
    orders: Card[];
    onCancelOrder: (orderId: string) => void;
    onChangeOrderStatus: (orderId: string, status: Order["status"]) =>  void;
}

export function OrdersBoard({icon, title, orders}: OrdersBoardProps) {

    return (
        <Board>
            <header>
                <span>{icon}</span>
                <strong>{title}</strong>
                <span>{orders.length}</span>
            </header>
            {orders.length > 0 && (
                <OrdersContainer>
                    {orders.map((card) => (
                        <button
                            type="button"
                            key={card._id}>
                            <strong>{card.titulo}</strong>
                            <span>{card.conteudo} itens</span>
                        </button>
                    ))}
                </OrdersContainer>
            )}
        </Board>
    );
}
