import { Button } from 'components'

interface ButtonGroupProps {
    primaryButtonLabel: string
    handler: () => void
    close: () => void
    flex?: boolean
}

const ButtonGroup = ({ primaryButtonLabel, handler, close, flex = false }: ButtonGroupProps) => {
    return (
        <div className={`mt-2 ${flex ? 'flex' : 'grid'} gap-2`}>
            <Button label={primaryButtonLabel} type='primary' handler={handler} />
            <Button label='Cancel' type='secondary' handler={close} />
        </div>
    )
}

export default ButtonGroup
