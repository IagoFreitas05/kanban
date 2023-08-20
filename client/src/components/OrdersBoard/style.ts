import styled from "styled-components";
export const Board = styled.div`
    padding: 16px;
    border: 1px solid rgba(204, 204, 204, 0.4);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;

    flex: 1;
   > header {
        padding: 8px;
        font-size: 14px;
        display:flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }
`;

export const OrdersContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 24px;

    div {
        background: #fff;
        border: 1px solid rgba(204, 204, 204, 0.4);
        height: 128px;
        border-radius: 8px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between; // Adjusted to space between content and buttons
        align-items: flex-start; // Adjusted to align content to the left
        gap: 4px;
        padding: 12px; // Added padding for better spacing
        .content {
            max-width: 100%; /* Ensure text doesn't exceed the card's width */
            white-space: normal; /* Allow text to wrap within the container */
            overflow: hidden; /* Optional: Handle overflow if text gets too long */
            text-overflow: ellipsis;
        }
        & + div {
            margin-top: 12px;
        }

        strong {
            font-weight: 500;
        }

        span {
            font-size: 14px;
            color: #666;
        }

        .buttons-container {
            display: flex;
            justify-content: space-between;
            width: 100%;

            button {
                background-color: transparent;
                border: none;
                cursor: pointer;
                margin-left: 8px;
            }
        }



    }
`;
