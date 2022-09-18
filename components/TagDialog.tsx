import axios from 'axios'
import { AddTags, CloseButton, DarkLayout, Tag, Title } from 'components'
import { MainContext } from 'contexts'
import { useClickOutside } from 'hooks'
import { TagSchema } from 'interfaces/schemas'
import { useContext, useState } from 'react'
import { AiOutlineTags } from 'react-icons/ai'
import useSWR from 'swr'
import { NotificationManager } from 'react-notifications'
import { fetcherForTagDialog } from 'utils/fetchers'

interface TagDialogProps {
    uuid: string
}
const TagDialog = ({ uuid }: TagDialogProps) => {
    const { dispatch } = useContext(MainContext)
    const [dialogVisible, setDialogVisible] = useState(false)
    const ref = useClickOutside<HTMLDivElement>(() => setDialogVisible(false))

    const { data, error, mutate } = useSWR(dialogVisible && [`/api/tags/${uuid}`], fetcherForTagDialog)

    const handleDeletionRequest = async (tagUuid: string) => {
        dispatch({ type: 'LOADING', payload: true })

        try {
            await axios.delete(`/api/tags/${tagUuid}`)
        } catch {
            dispatch({ type: 'LOADING', payload: false })
            return NotificationManager.error(`Something went wrong! Unable to delete tag.`)
        }

        mutate()

        NotificationManager.success(`Tag has been deleted successfully!`)
        dispatch({ type: 'LOADING', payload: false })
    }

    if (error) return <div>Error</div>
    return (
        <>
            <button
                className='h-6 w-6 rounded-full outline-none outline-offset-0 transition-transform duration-200 ease-in-out hover:scale-110 focus-visible:outline-blue-300'
                onClick={() => setDialogVisible(true)}
            >
                <AiOutlineTags className='h-full w-full text-slate-400 group-hover:text-slate-200' />
            </button>
            {dialogVisible && data && (
                <DarkLayout>
                    <div
                        ref={ref}
                        className='relative grid w-[32rem] max-w-[90%] animate-slideInFromBottom items-start gap-4 rounded-lg border-blue-300 bg-white p-8 text-slate-800 ring-1 ring-blue-300 dark:bg-slate-900 dark:text-slate-200'
                    >
                        <Title title='Tags' /> <CloseButton close={() => setDialogVisible(false)} />
                        {data.length ? (
                            <div className='flex flex-wrap gap-2'>
                                {data.map((tag: TagSchema) => (
                                    <Tag key={tag.uuid} kv={tag.kv} close={() => handleDeletionRequest(tag.uuid)} />
                                ))}
                            </div>
                        ) : (
                            <div>No tags applied.</div>
                        )}
                        <AddTags uuid={uuid} closeDialog={() => setDialogVisible(false)} />
                    </div>
                </DarkLayout>
            )}
        </>
    )
}

export default TagDialog
