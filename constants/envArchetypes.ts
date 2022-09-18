export type EnvArchetype = {
    uuid: string
    name: string
}

export type ArchetypeKeys =
    | 'ef0462a1-5346-4a8a-803b-4a54a3791cf2'
    | '4f1e8dad-4353-4e90-8887-f297f167344b'
    | 'f5d1c6d6-8c44-404b-bd58-69e13fcced00'

export const ENV_ARCHETYPES = [
    {
        uuid: 'ef0462a1-5346-4a8a-803b-4a54a3791cf2',
        name: 'Production',
    },
    {
        uuid: '4f1e8dad-4353-4e90-8887-f297f167344b',
        name: 'Test',
    },
    {
        uuid: 'f5d1c6d6-8c44-404b-bd58-69e13fcced00',
        name: 'Development',
    },
]
