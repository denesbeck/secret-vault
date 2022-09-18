import { AiOutlineClose } from 'react-icons/ai'

interface TagProps {
    kv: string
    close?: () => void
}

const Tag = ({ kv, close }: TagProps) => {
    return (
        <div
            className={`flex h-6 w-max animate-[textFocus_0.3s_ease-in-out] select-none items-center space-x-1 rounded-full bg-slate-400 px-3 text-center text-white shadow-md ring-1 ring-white hover:bg-slate-300 group-hover:bg-slate-300`}
        >
            <span className={`mr-1 h-max w-max font-mono text-sm font-normal`}>{kv}</span>
            {close && (
                <button className='rounded-full outline-none focus-visible:outline-blue-300' onClick={close}>
                    <AiOutlineClose />
                </button>
            )}
        </div>
    )
}

export default Tag
