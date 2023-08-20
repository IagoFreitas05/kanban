import {Order} from '../../types/Order';
import {OrdersBoard} from '../OrdersBoard';
import {Button, Container} from './styles';
import {useEffect, useState} from 'react';
import {listCard} from "../../services/CardService.ts";
import {Card} from "../../types/Card.ts";
import {OrderModal} from "../OrderModal";


export function Orders() {
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        listCard().then(item => setCards(item.data))
        console.log(cards);
    }, []);

    const done = cards.filter((card) => card.lista === 'DONE');
    const todo = cards.filter((card) => card.lista === 'TO_DO');
    const doing = cards.filter((card) => card.lista === 'DOING');

    function handleCancelOrder(orderId: string) {
        setCards((prevState) => prevState.filter(card => card._id !== orderId));
    }

    function handleOrderStatusChange(orderId: string, status: Order['status']) {
        setCards((prevState) => prevState.map((card) => (
            card._id === orderId
                ? {...card, status}
                : card
        )));
    }

    function handleCloseModal() {
        setIsModalVisible(false);
    }

    function handleOpenModal() {
        setIsModalVisible(true);
    }

    const [isModalVisibile, setIsModalVisible] = useState(false);

    return (
        <>
            <OrderModal
                visible={isModalVisibile}
                onClose={handleCloseModal}
            />
            <Container>
                <Button onClick={handleOpenModal} type="button">nova tarefa</Button>
            </Container>

            <Container>
                <OrdersBoard
                    icon="🕒"
                    title="ToDo"
                    orders={todo}
                    onCancelOrder={handleCancelOrder}
                    onChangeOrderStatus={handleOrderStatusChange}
                />
                <OrdersBoard
                    icon="👨🏻‍🍳"
                    title="Doing"
                    orders={doing}
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
        </>
    );
}
