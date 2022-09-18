import CopyButton from './CopyButton'

interface SecretFieldProps {
    value: string
    copyButton?: boolean
}

const SecretField = ({ value, copyButton = false }: SecretFieldProps) => {
    return (
        <div className='flex items-center'>
            <input type='password' value={'0123456789'} size={10} readOnly className='w-max bg-transparent outline-none' tabIndex={-1} />
            {copyButton && <CopyButton value={value} colored />}
        </div>
    )
}

export default SecretField
