import { Checkbox, QuickSearch } from 'components'
import { useState } from 'react'
import { ArchetypeState } from './LinkToEnv'
import { IoOptions } from 'react-icons/io5'

interface EnvFilterProps {
    showLinkedOnlyValue: boolean
    toggleShowLinkedOnly: () => void
    filter: (value: string) => void
    toggleArchetypes: (value: any) => void
    archetypeState: ArchetypeState
}

const EnvFilter = ({ showLinkedOnlyValue, toggleShowLinkedOnly, filter, toggleArchetypes, archetypeState }: EnvFilterProps) => {
    const [optionsVisible, setOptionsVisible] = useState(false)

    return (
        <div className='h-max overflow-hidden rounded pl-1 pt-1'>
            {
                <button
                    onClick={() => setOptionsVisible((prevState) => !prevState)}
                    className='mb-4 flex items-center space-x-2 rounded py-0.5 text-slate-400 outline-none hover:text-slate-500 focus-visible:outline-blue-300 dark:hover:text-slate-300'
                >
                    <IoOptions className='h-6 w-6' /> <span>Filter...</span>
                </button>
            }
            <div
                className={`grid ${
                    optionsVisible ? 'max-h-96' : 'max-h-0'
                } gap-6 rounded border-l-4 border-slate-500 pl-4 transition-all duration-500 ease-in-out`}
            >
                <QuickSearch filter={(value: string) => filter(value)} />
                <Checkbox label='Show linked only' value={showLinkedOnlyValue} toggle={toggleShowLinkedOnly} />
                <div className='flex flex-wrap gap-x-10'>
                    <Checkbox
                        label='Production'
                        value={archetypeState['ef0462a1-5346-4a8a-803b-4a54a3791cf2']}
                        toggle={() =>
                            toggleArchetypes((prevState: ArchetypeState) => {
                                return {
                                    ...prevState,
                                    'ef0462a1-5346-4a8a-803b-4a54a3791cf2': !prevState['ef0462a1-5346-4a8a-803b-4a54a3791cf2'],
                                }
                            })
                        }
                        color='accent-teal-500 hover:accent-teal-600 focus-visible:outline-teal-500 dark:hover:accent-teal-400'
                    />
                    <Checkbox
                        label='Test'
                        value={archetypeState['4f1e8dad-4353-4e90-8887-f297f167344b']}
                        toggle={() =>
                            toggleArchetypes((prevState: ArchetypeState) => {
                                return {
                                    ...prevState,
                                    '4f1e8dad-4353-4e90-8887-f297f167344b': !prevState['4f1e8dad-4353-4e90-8887-f297f167344b'],
                                }
                            })
                        }
                        color='accent-blue-500 hover:accent-blue-600 focus-visible:outline-blue-500 dark:hover:accent-blue-400'
                    />
                    <Checkbox
                        label='Development'
                        value={archetypeState['f5d1c6d6-8c44-404b-bd58-69e13fcced00']}
                        toggle={() =>
                            toggleArchetypes((prevState: ArchetypeState) => {
                                return {
                                    ...prevState,
                                    'f5d1c6d6-8c44-404b-bd58-69e13fcced00': !prevState['f5d1c6d6-8c44-404b-bd58-69e13fcced00'],
                                }
                            })
                        }
                        color='accent-cyan-800 hover:accent-cyan-900 focus-visible:outline-cyan-800 dark:hover:accent-cyan-700'
                    />
                </div>
            </div>
        </div>
    )
}

export default EnvFilter
