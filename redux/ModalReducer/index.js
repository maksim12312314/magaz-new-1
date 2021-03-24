import { MODAL_SHOW, MODAL_CLOSE, MODAL_TOGGLE } from "./types";

export const initialModalState = {
    visible: false, // Видимость окна
    title: { text: "", params: {} }, // Заголовок
    text: { text: "", params: {} }, // Текст
    animationIn: "slideInRight", // Анимация появления
    animationOut: "slideOutLeft", // Анимация исчезновения
    buttons: [], // Кнопки
};

const modalReducer = ( state = initialCartState, action ) => {
    switch (action.type) {

        /**
         * Открывает модальное окно
         */
        case MODAL_SHOW: {
            const newState = {...state};
            const { payload } = action;
            if ( payload )
                newState.modal = { ...newState.modal, ...payload }
            newState.modal.visible = true;

            return newState;
        }

        /**
         * Закрывает модальное окно
         */
        case MODAL_CLOSE: {
            const newState = {...state};
            newState.modal.visible = false;

            return newState;
        }
        
        /**
         * Переключает состояние модального окна
         */
        case MODAL_TOGGLE: {
            const newState = {...state};
            const { payload } = action;
            if ( payload )
                newState.modal = { ...newState.modal, ...payload }
            newState.modal.visible = !newState.modal.visible;

            return newState;
        }

        default: {
            return state;
        }
    }
};

export default modalReducer;