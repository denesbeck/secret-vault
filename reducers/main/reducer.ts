import { MainActionSchema, MainStateSchema } from './schemas'

const initialState = {
    user: null,
    isAuthorized: false,
    namespaces: null,
    environments: null,
    loading: false,
    showOwnedOnly: false,
    searchString: '',
}

const reducer = (state: MainStateSchema, action: MainActionSchema) => {
    switch (action.type) {
        case 'USER':
            return { ...state, user: action.payload }
        case 'IS_AUTHORIZED':
            return { ...state, isAuthorized: action.payload }
        case 'NAMESPACES':
            return { ...state, namespaces: action.payload }
        case 'ENVIRONMENTS':
            return { ...state, environments: action.payload }
        case 'LOADING':
            return { ...state, loading: action.payload }
        case 'SHOW_OWNED_ONLY':
            return { ...state, showOwnedOnly: action.payload }
        case 'SEARCH_STRING':
            return { ...state, searchString: action.payload }
        default:
            throw new Error()
    }
}

export { initialState, reducer }
