import axios from 'axios'
import { Button, TagInput } from 'components'
import { MainContext } from 'contexts'
import { genHexString } from 'libs/cryptoJs'
import { useContext, useState } from 'react'
import { NotificationManager } from 'react-notifications'

type Tag = {
    id: string
    tagKey: string | null
    tagValue: string
}

const generateEmptyTag = () => {
    const id = genHexString(6)
    return { id: id, tagKey: null, tagValue: '' }
}

interface AddTagsProps {
    uuid: string
    closeDialog: () => void
}

const AddTags = ({ uuid, closeDialog }: AddTagsProps) => {
    const { dispatch } = useContext(MainContext)
    const [tags, setTags] = useState<Tag[]>([generateEmptyTag()])

    const handleUpdateKey = (id: string, newKey: string) =>
        setTags((prevState) => {
            const tempArr = [...prevState]
            tempArr.forEach((el) => {
                if (el.id === id) el.tagKey = newKey
            })
            return tempArr
        })

    const handleUpdateValue = (id: string, newValue: string) =>
        setTags((prevState) => {
            const tempArr = [...prevState]
            tempArr.forEach((el) => {
                if (el.id === id) el.tagValue = newValue
            })
            return tempArr
        })

    const handleDeleteTag = (id: string) => {
        if (tags.length === 1) return [generateEmptyTag()]
        setTags((prevState) => prevState.filter((el) => el.id !== id))
    }

    const handleAddTag = () => {
        if (tags.length === 5) {
            return NotificationManager.info('You can only register five tags at once!')
        }
        if (tags.length > 5) return
        setTags((prevState) => [...prevState, generateEmptyTag()])
    }

    const handleRegisterTags = async () => {
        dispatch({ type: 'LOADING', payload: true })

        const tempArr = tags.filter((tag) => tag.tagKey && tag.tagValue.length)
        if (!tempArr.length) {
            dispatch({ type: 'LOADING', payload: false })
            return NotificationManager.warning('You must enter at least one valid tag!')
        }

        try {
            await axios.post('/api/tags', {
                kvs: JSON.stringify(tempArr.map((el) => el.tagKey + '=' + el.tagValue)),
                secretUuid: uuid,
            })
        } catch {
            dispatch({ type: 'LOADING', payload: false })
            return NotificationManager.error('Something went wrong! Unable to register tag(s).')
        }

        closeDialog()
        dispatch({ type: 'LOADING', payload: false })
    }

    return (
        <div className='border-t border-slate-200 py-4'>
            <div className='grid max-h-[50%] gap-4 p-1'>
                {tags.map((tag) => (
                    <TagInput
                        key={tag.id}
                        {...tag}
                        updateKey={(newKey: string) => handleUpdateKey(tag.id, newKey)}
                        updateValue={(newValue: string) => handleUpdateValue(tag.id, newValue)}
                        deleteTag={() => handleDeleteTag(tag.id)}
                    />
                ))}
            </div>

            <button
                onClick={handleAddTag}
                className='mt-4 w-max rounded bg-slate-800 px-2 py-0.5 text-slate-200 outline-none hover:bg-slate-700 focus-visible:outline-blue-300 dark:bg-slate-700 dark:hover:bg-slate-600'
            >
                Add tag
            </button>
            <div className='mt-10'>
                <Button label='Submit' type='secondary' handler={handleRegisterTags} />
            </div>
        </div>
    )
}

export default AddTags
