import { MdOutlinePending } from 'react-icons/md'
import { Tag } from 'components'

interface TagsHeadProps {
    tags: string[]
}

const TagsHead = ({ tags }: TagsHeadProps) => {
    return (
        <div className='group flex items-center space-x-1'>
            {tags.length ? <Tag kv={tags[0]} /> : <div>-</div>}
            {tags.length > 1 && (
                <MdOutlinePending className='h-6 w-6 rounded-full text-slate-400 outline-none outline-offset-0 focus-visible:outline-blue-300 group-hover:text-slate-200' />
            )}
        </div>
    )
}

export default TagsHead
