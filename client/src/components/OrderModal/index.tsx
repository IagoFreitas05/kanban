import {useEffect, useState} from 'react';
import closeIcon from '../../assets/images/close-icon.svg';
import {Order} from '../../types/Order';
import {ModalBody, Overlay, Actions, FormGroup} from './styles';
import {api} from "../../utils/api.ts";
import {saveCard} from "../../services/CardService.ts";

interface OrderModalProps {
    visible: boolean;
    order: Order | null;
    onClose: () => void;
    onCancelOrder: () => Promise<null | undefined>;
    isLoading: boolean;
    onChangeOrderStatus: () => void;

}

export function OrderModal({visible,onClose, isLoading}: OrderModalProps) {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [formValid, setFormValid] = useState<boolean> (false);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };

    }, [onClose]);

    function onSaveCard(){
        saveCard(title, content);
        setContent("");
        setTitle("");
        onClose();
        setFormValid(false);
    }

    if (!visible) {
        return null;
    }

   function verifyFormValid(){
        if(content.length > 0 && title.length > 0){
            setFormValid(true);
        }
    }
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        verifyFormValid();
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
        verifyFormValid();
    };
    return (
        <Overlay>
            <ModalBody>
                <header>
                    <strong>Nova tarefa</strong>
                    <button type="button" onClick={onClose}>
                        <img src={closeIcon} alt="fechar modal"/>
                    </button>
                </header>
                <FormGroup>
                    <input type="text" placeholder="título" value={title} onChange={handleTitleChange}/>
                    <textarea placeholder="conteúdo" value={content} onChange={handleContentChange}></textarea>
                    <small>todos os campos são necessários*</small>
                </FormGroup>
                <Actions>
                    <button
                        disabled={!formValid}
                        onClick={onSaveCard}
                        type="button"
                        className="primary">
                        <strong>Salvar</strong>
                    </button>
                    <button
                        disabled={isLoading}
                        onClick={onClose}
                        type="button"
                        className="secondary">
                        <strong>Cancelar</strong>
                    </button>
                </Actions>
            </ModalBody>
        </Overlay>
    );
}
