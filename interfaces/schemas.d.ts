export type UserSchema = {
    name: string
    email: string
    accessProfiles: string[]
}

export interface NamespaceSchema {
    uuid: string
    name: string
    selected?: boolean
}

export interface SecretSchema {
    uuid: string
    api_key: string
    name: string
    owner_name: string
    owner_email: string
    username: string
    password: string
    expiration_date: string
    namespaces: string[]
    environments: string[]
    tags: string[]
}

export interface ApplicationSchema {
    uuid: string
    name: string
    owner_name: string
    owner_email: string
    ns_uuid: string
    ws_name: string
}

export interface EnvironmentSchema {
    uuid: string
    api_key: string
    name: string
    archetype_uuid: string
    app_uuid: string
    app_name?: string
    owner_email?: string
    ns_uuid: string
    ws_name?: string
    ref_uuid?: string | null
}

export interface TagSchema {
    uuid: string
    kv: string
}
