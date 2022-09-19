import { SecretInputValues } from './types'
import { NotificationManager } from 'react-notifications'

export const validateInputs = (inputValues: SecretInputValues) => {
    let result = true

    const props = [
        ['name', 'a name'],
        ['username', 'a username'],
        ['password', 'a password'],
        ['expirationDate', 'an expiration date'],
    ]

    props.forEach((input) => {
        if (!(inputValues[input[0] as keyof SecretInputValues] as unknown as string).length) {
            NotificationManager.error(`Please enter ${input[1]}.`)
            result = false
        }
    })

    return result
}
