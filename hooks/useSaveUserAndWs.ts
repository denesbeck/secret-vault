import { UserSchema, NamespaceSchema } from 'interfaces/schemas'
import { useContext, useEffect } from 'react'
import { MainContext } from 'contexts'

const useSaveUserAndWs = (isAuthorized: boolean, user: UserSchema, namespaces: NamespaceSchema[]) => {
    const { state, dispatch } = useContext(MainContext)

    useEffect(() => {
        dispatch({ type: 'IS_AUTHORIZED', payload: isAuthorized || false })
        if (!state.user) dispatch({ type: 'USER', payload: { name: user.name, email: user.email, bluegroups: user.bluegroups } })
        if (!state.namespaces)
            dispatch({
                type: 'NAMESPACES',
                payload: namespaces.map((el: NamespaceSchema) => {
                    return { ...el, selected: true }
                }),
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export default useSaveUserAndWs
