
import { Board, OrdersContainer } from "./style";
import { Card } from "../../types/Card.ts";
import {deleteCard} from "../../services/CardService.ts";
import {toast} from "react-toastify";

interface OrdersBoardProps {
    icon: string;
    title: string;
    orders: Card[];
    onCancelOrder: (orderId: string) => void;
    onChangeOrderStatus: (orderId: string, lista: Card["lista"]) => void;
}

export function OrdersBoard({ icon, title, orders, onCancelOrder, onChangeOrderStatus }: OrdersBoardProps) {
    function handleCancelOrder(id: string){
        deleteCard(id).then(() => toast.success("Tarefa removida"))
            .catch(() => toast.error("Não foi possível remover a tarefa"));
        onCancelOrder(id);
    }

    function handleChangeList(id: string, lista: Card["lista"]){
        onChangeOrderStatus(id, "DOING");
    }
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
                        <>
                            <div key={card._id}>
                                <strong>{card.titulo}</strong>
                                <span className="content">{card.conteudo}</span>
                                <span className="buttons-container">
                                    <button onClick={() => handleCancelOrder(card._id)}>🗑️</button>
                                    {card.lista != "DONE" && (
                                        <button onClick={() => handleChangeList(card._id, card.lista)}> → </button>
                                    )}
                                </span>
                            </div>
                        </>
                    ))}
                </OrdersContainer>
            )}
        </Board>
    );
}
