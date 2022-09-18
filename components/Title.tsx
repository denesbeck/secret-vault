interface TitleProps {
    title: string
}

const Title = ({ title }: TitleProps) => {
    return (
        <label htmlFor='input-dialog' className='text-2xl font-bold text-slate-800 dark:text-slate-200'>
            {title}
        </label>
    )
}

export default Title
