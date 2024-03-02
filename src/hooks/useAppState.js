import { useMemo, useReducer } from "react";

const initialState = {};

const reducer = (state, action) => {
    let getMessage = state.getMessage;

    if (action.type === "error") {
        console.error(action.payload);
        if (action.onError) {
            getMessage = { message: `Error: ${action.onError}`, isSuccessful: false };
        }
    }

    if (action.onSuccess) {
        getMessage = { message: action.onSuccess, isSuccessful: true };
    }

    if (action.type === "clearMessage") {
        getMessage = null;
    }

    if (action.type === "updateState") {
        return {
            ...state,
            ...action.payload,
            getMessage
        };
    }

    return {
        ...state,
        [action.type]: action.payload,
        getMessage
    };
};

export const useAppState = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const actionCount = useMemo(() => ({}), []);

    return [
        state,
        ({ type, payload, onSuccess, onError }) => {
            actionCount[type] = ++actionCount[type] || 1;
            dispatch({
                type,
                payload: typeof payload === "undefined" ? actionCount[type] : payload,
                onSuccess,
                onError
            });
        }
    ];
};
