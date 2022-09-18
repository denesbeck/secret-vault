import { UserSchema, NamespaceSchema } from 'interfaces/schemas'
import { MainActionPayloads, MainActionTypes, Namespace } from './types'

export interface MainStateSchema {
    user: UserSchema | null
    isAuthorized: boolean
    namespaces: NamespaceSchema[] | null
    environments: string[] | null
    loading: boolean
    showOwnedOnly: boolean
    searchString: string
}

export interface MainActionSchema {
    type: MainActionTypes
    payload: MainActionPayloads
}
