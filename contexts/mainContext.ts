import { createContext } from 'react'
import { initialState } from 'reducers/main/reducer'
import { MainActionSchema, MainStateSchema } from 'reducers/main/schemas'

const MainContext = createContext<{
    state: MainStateSchema
    dispatch: React.Dispatch<MainActionSchema>
}>({ state: initialState, dispatch: () => undefined })

export default MainContext
