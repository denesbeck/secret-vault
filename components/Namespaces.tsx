import { Namespace } from 'components'
import { MainContext } from 'contexts'
import { NamespaceSchema } from 'interfaces/schemas'
import { useContext, useEffect, useState } from 'react'

interface NamespacesProps {
    allLabel: string
}
const Namespaces = ({ allLabel }: NamespacesProps) => {
    const { state, dispatch } = useContext(MainContext)
    const [allSelected, setAllSelected] = useState(true)

    useEffect(() => {
        setAllSelected(state.namespaces!.every((ns: NamespaceSchema) => ns.selected))
    }, [state.namespaces])

    const selectNamespace = (ns: NamespaceSchema) => {
        dispatch({
            type: 'NAMESPACES',
            payload: state.namespaces!.map((ws_el: NamespaceSchema) => {
                if (ws_el.uuid === ns.uuid) return { ...ws_el, selected: true }
                return { ...ws_el, selected: false }
            }),
        })
        setAllSelected(false)
    }

    const selectAllNamespaces = () => {
        dispatch({
            type: 'NAMESPACES',
            payload: state.namespaces!.map((ns: NamespaceSchema) => {
                ns.selected = true
                return ns
            }),
        })
        setAllSelected(true)
    }

    return (
        <>
            {!allSelected && <Namespace label={allLabel} handler={selectAllNamespaces} />}
            {(!allSelected ? state.namespaces!.filter((ns: NamespaceSchema) => !ns.selected) : state.namespaces!).map(
                (ns: NamespaceSchema) => (
                    <Namespace key={ns.uuid} label={ns.name} handler={() => selectNamespace(ns)} />
                )
            )}
        </>
    )
}

export default Namespaces
