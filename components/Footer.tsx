import { BsGithub, BsTwitter } from 'react-icons/bs'

const Footer = () => {
    return (
        <footer className='flex h-32 w-full items-center justify-start px-2 pb-8 pt-12 text-slate-300 sm:px-8'>
            <div className='mr-auto select-none break-words text-sm'>&copy; 2022 All rights reserved | Created by Denes Beck</div>
            <div className='flex flex-wrap gap-6'>
                <a
                    className='h-7 w-7 cursor-pointer rounded-full outline-none outline-offset-4 hover:text-slate-400 focus-visible:outline-blue-300'
                    href='https://github.com/denesbeck'
                    target='_blank'
                    rel='noreferrer'
                >
                    <BsGithub className='h-full w-full' />
                </a>
                <a
                    className='h-7 w-7 cursor-pointer rounded-full outline-none outline-offset-4 hover:text-slate-400 focus-visible:outline-blue-300'
                    href='https://twitter.com/'
                    target='_blank'
                    rel='noreferrer'
                >
                    <BsTwitter className='h-full w-full' />
                </a>
            </div>
        </footer>
    )
}

export default Footer
