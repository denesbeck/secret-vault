import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import '/styles/notifications.css'
import { useReducer } from 'react'
import { MainContext } from 'contexts'
import { initialState, reducer } from 'reducers/main/reducer'
import { MainStateSchema } from 'reducers/main/schemas'
import { MainReducerType } from 'reducers/main/types'
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }: AppProps) {
    const [state, dispatch] = useReducer(reducer as MainReducerType, initialState as MainStateSchema)
    return (
        <>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
                <MainContext.Provider value={{ state: state, dispatch: dispatch }}>
                    <Component {...pageProps} />
                </MainContext.Provider>
            </ThemeProvider>
            <NotificationContainer />
        </>
    )
}

export default MyApp
