import { ReactNode, createContext, useEffect, useReducer } from 'react'
import { useNavigate } from "react-router-dom";

import { initialResponse } from '../values/response.value';
import { ERROR_LOGIN, ERROR_REGISTER } from '../constants/response.const';
import responseReducer from '../reducers/response.reducer';

import * as userApi from '../api/user.api'
import { AUTH, LOGOUT } from '../constants/user.const'
import userReducer from '../reducers/user.reducer'
import { initialUser } from '../values/user.value'
import { IReducerUser, IUserLogin, IUserRegister } from '../../interface/User';
import { IAction } from '../../interface/Reducer';
import { IReducerResponse } from '../../interface/Response';

import { isStorage } from '../../helper/storage';

export const UserContext = createContext<IReducerUser>(initialUser)
export const ResponseContext = createContext<IReducerResponse>(initialResponse)

export const UserContextGlobal = ({ children }: { children: ReactNode }) => {

    const navigate = useNavigate()

    const [state, dispatch] = useReducer<(state: IReducerUser, action: IAction) => IReducerUser>(userReducer, initialUser)
    const [stateR, dispatchR] = useReducer<(state: IReducerResponse, action: IAction) => IReducerResponse>(responseReducer, initialResponse)

    useEffect(() => {

        if(isStorage()) {
            dispatch({
                type: AUTH,
                payload: JSON.parse(localStorage.getItem("user") as string)
            })
        }
        
    }, [])

    const login = async (userData: IUserLogin) => {

        try {

            const { data } = await userApi.loginApi(userData)

            dispatch({
                type: AUTH,
                payload: data
            })

            navigate('/main')

        } catch (error: any) {
            dispatchR({
                type: ERROR_LOGIN,
                payload: error.response.data.message
            })
        }

    }

    const register = async (userData: IUserRegister) => {

        try {

            const { data } = await userApi.registerApi(userData)

            dispatch({
                type: AUTH,
                payload: data
            })

            navigate('/main')

        } catch (error: any) {
            dispatchR({
                type: ERROR_REGISTER,
                payload: error.response.data.message
            })
        }

    }

    const logout = () => {

        try {

            dispatch({
                type: LOGOUT,
                payload: false
            })

            navigate('/')

        } catch (error) {
            throw error
        }

    }

    return (
        <ResponseContext.Provider value={stateR}>
            <UserContext.Provider value={{ ...state, login, register, logout } as IReducerUser}>
                {children}
            </UserContext.Provider>
        </ResponseContext.Provider>
    )
}