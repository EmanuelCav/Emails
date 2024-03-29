import { CREATE_MESSAGE, DELETE_MESSAGE, GET_MESSAGE, MESSAGES_OBTAINED, MESSAGES_SENT, REVEICE_MESSAGE } from "../constants/email.const";

import { initialEmail } from "../values/email.value"

import { IMessage, IReducerEmail } from "../../interface/Email";
import { IAction } from "../../interface/Reducer";

const emailReducer = (state: IReducerEmail = initialEmail, action: IAction): IReducerEmail | any => {
    switch (action.type) {
        case MESSAGES_OBTAINED:
            return {
                ...state,
                messagesObtained: action.payload,
            }

        case MESSAGES_SENT:
            return {
                ...state,
                messagesSent: action.payload
            }

        case GET_MESSAGE:
            return {
                ...state,
                message: action.payload
            }

        case CREATE_MESSAGE:
            return {
                ...state,
                messagesSent: [...state.messagesSent, action.payload]
            }

        case DELETE_MESSAGE:
            return {
                ...state,
                messagesSent: state.messagesSent.filter((msg: IMessage) => msg._id !== action.payload)
            }

        case REVEICE_MESSAGE:
            return {
                ...state,
                messagesObtained: [...state.messagesObtained, action.payload]
            }

        default:
            return state;
    }
}

export default emailReducer