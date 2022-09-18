import { UserSchema, NamespaceSchema } from 'interfaces/schemas'
import { MainActionSchema, MainStateSchema } from './schemas'

export type MainActionTypes = 'USER' | 'IS_AUTHORIZED' | 'NAMESPACES' | 'ENVIRONMENTS' | 'LOADING' | 'SHOW_OWNED_ONLY' | 'SEARCH_STRING'

export type MainActionPayloads = UserSchema | boolean | NamespaceSchema[] | NamespaceSchema | string[] | string | null

export type MainReducerType = (state: MainStateSchema, action: MainActionSchema) => MainStateSchema
