import {Order} from '../../types/Order';
import {OrdersBoard} from '../OrdersBoard';
import {Button, Container} from './styles';
import {useEffect, useState} from 'react';
import {listCard} from "../../services/CardService.ts";
import {Card} from "../../types/Card.ts";
import {OrderModal} from "../OrderModal";
import {toast} from "react-toastify";


export function Orders() {
    const [cards, setCards] = useState<Card[]>([]);
    const [currentEdited, setCurrentEdited] = useState<Card>();
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

    function handleOrderStatusChange(orderId: string, status: Card['lista']) {
       const card = cards.filter((card) => card._id === orderId);
       card[0].lista = status;
        setCards((prevState) => prevState.map((card) => (
            card._id === orderId
                ? {...card, status}
                : card
        )));
        toast.success("Tarefa movida com sucesso")
    }

    function handleCloseModal() {
        setIsModalVisible(false);
        setCurrentEdited(undefined);
    }

    function handleOpenModal() {
        setIsModalVisible(true);
    }

    function handleSaveCard(card : Card){
      setCards((prevState) => prevState.concat(card));
    }

    function handleCurrentEdit(card: Card){
        toast.info("editando: " + card.titulo)
        setCurrentEdited(card);
        setIsModalVisible(true);
    }

    function handleEditCard(editedCard: Card) {
        setCards((prevState) =>
            prevState.map((card) =>
                card._id === editedCard._id ? { ...editedCard } : card
            )
        );

        setCurrentEdited(undefined);
    }


    const [isModalVisibile, setIsModalVisible] = useState(false);

    return (
        <>
            <OrderModal
                visible={isModalVisibile}
                onClose={handleCloseModal}
                onSaveCard={handleSaveCard}
                currentEdit={currentEdited}
                onEditCard={handleEditCard}
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
                    onCurrentEdited={handleCurrentEdit}
                />
                <OrdersBoard
                    icon="👨🏻‍🍳"
                    title="Doing"
                    orders={doing}
                    onCancelOrder={handleCancelOrder}
                    onChangeOrderStatus={handleOrderStatusChange}
                    onCurrentEdited={handleCurrentEdit}
                />
                <OrdersBoard
                    icon="✅"
                    title="Done"
                    orders={done}
                    onCancelOrder={handleCancelOrder}
                    onChangeOrderStatus={handleOrderStatusChange}
                    onCurrentEdited={handleCurrentEdit}
                />
            </Container>
        </>
    );
}
