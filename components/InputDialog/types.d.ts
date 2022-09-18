import { NamespaceSchema } from 'interfaces/schemas'

export type SecretInputValues = {
    name: string
    username: string
    password: string
    expirationDate: string
}

export type AppInputValues = {
    uuid?: string
    name: string
    ownerName?: string
    ownerEmail?: string
    namespace: NamespaceSchema | null
}
