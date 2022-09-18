interface ShortcutProps {
    label: string
}

function Shortcut({ label }: ShortcutProps) {
    return (
        <span className='h-max select-none rounded bg-slate-400 px-1 font-semibold text-slate-600 shadow ring-1 ring-slate-500/20'>
            {label}
        </span>
    )
}

export default Shortcut
