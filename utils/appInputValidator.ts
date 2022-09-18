import { NotificationManager } from 'react-notifications'

export const validateInputs = (
    namespace: string | undefined,
    appName: string | undefined,
    ownerName: string | undefined,
    ownerEmail: string | undefined
) => {
    let result = true
    if (!namespace) {
        NotificationManager.warning('Please select namespace.')
        result = false
    }
    if (!appName) {
        NotificationManager.warning('Please enter application name.')
        result = false
    }
    if (!ownerName || !ownerEmail) {
        NotificationManager.warning('Current user not found! Please refresh the page and try again.')
        result = false
    }
    return result
}
