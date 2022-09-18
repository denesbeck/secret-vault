import { ReactNode, useContext } from 'react'
import { Footer, Loading, NavBar } from 'components'
import { useMoveBackground } from 'hooks'
import Image from 'next/image'
import { MainContext } from 'contexts'
import mountain from 'public/mountain.jpg'

interface LayoutProps {
    children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    const { state } = useContext(MainContext)
    const ref = useMoveBackground()

    return (
        <>
            <div className='relative flex h-screen w-screen overflow-hidden'>
                <div ref={ref} className='absolute top-0 left-0 h-[120%] w-[120%] animate-textFocus'>
                    <Image src={mountain} alt='main_background' layout='fill' />
                </div>
                <div id='container' className='absolute top-0 left-0 flex h-full w-full flex-col items-center overflow-y-auto'>
                    <NavBar />
                    <main className='mt-12 flex w-full flex-1 items-start justify-center'>{children}</main>
                    <Footer />
                </div>
            </div>
            {state.loading && <Loading />}
        </>
    )
}

export default Layout
