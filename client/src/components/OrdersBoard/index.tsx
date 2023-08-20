
import { Board, OrdersContainer } from "./style";
import { Card } from "../../types/Card.ts";
import {deleteCard} from "../../services/CardService.ts";
import {toast} from "react-toastify";

interface OrdersBoardProps {
    icon: string;
    title: string;
    orders: Card[];
    onCancelOrder: (orderId: string) => void;
    onChangeOrderStatus: (orderId: string, status: Card["lista"]) => void;
}

export function OrdersBoard({ icon, title, orders, onCancelOrder }: OrdersBoardProps) {
    function handleCancelOrder(id: string){
        deleteCard(id).then(() => toast.success("Tarefa removida"))
            .catch(() => toast.error("Não foi possível remover a tarefa"));
        onCancelOrder(id);
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
                                        <button> → </button>
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
