export const HEADERS = ['NAME', 'API KEY', 'OWNER_NAME', 'USERNAME', 'PASSWORD', 'EXPIRATION DATE', 'TAGS', 'STATUS', 'ACTIONS']

type COLUMN_TYPE = { label: string; name: string; isSecret: boolean }

const MY_SECRETS_HEADERS = [
    { label: 'SECRET', name: 'name', isSecret: false },
    { label: 'NS/APP/ENV', name: 'environments', isSecret: false },
    { label: 'API KEY', name: 'api_key', isSecret: true },
    { label: 'OWNER NAME', name: 'owner_name', isSecret: false },
    { label: 'OWNER EMAIL', name: 'owner_email', isSecret: false },
    { label: 'USERNAME', name: 'username', isSecret: false },
    { label: 'PASSWORD', name: 'password', isSecret: true },
    { label: 'EXPIRATION DATE', name: 'expiration_date', isSecret: false },
]
const MY_APPS_HEADERS = [
    { label: 'NAMESPACE', name: 'namespace', isSecret: false },
    { label: 'APP', name: 'name', isSecret: false },
    { label: 'ENV/SECRET', name: 'secrets', isSecret: false },
    { label: 'OWNER NAME', name: 'owner_name', isSecret: false },
    { label: 'OWNER EMAIL', name: 'owner_email', isSecret: false },
]

export const VIEW_OBJECTS = {
    'my-secrets': { columns: MY_SECRETS_HEADERS, endpoint: '/api/views/my-secrets' },
    'my-apps': { columns: MY_APPS_HEADERS, endpoint: '/api/views/my-apps' },
}

export type VIEW_TYPE = 'my-secrets' | 'my-apps'

export type VIEW_OBJECTS_TYPE = {
    'my-secrets': VIEW_METADATA_TYPE
    'my-apps': VIEW_METADATA_TYPE
}

export type VIEW_METADATA_TYPE = {
    columns: COLUMN_TYPE[]
    endpoint: string
}

export const VIEWS = ['my-secrets', 'my-apps']
