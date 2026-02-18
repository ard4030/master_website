import { IoClose } from 'react-icons/io5'
import styles from './sidemodal.module.css'


const SideModal = ({children,title,open,setOpen,handleSave,width}) => {
  return (
    <>
        {
        open && 
            <div className={`${styles.modal}`}>
                <div 
                style={{width:width?width:"30%"}}
                className={`${styles.content} dark:bg-gray-800 max-[768px]:!w-full`}>
                    <div className=''>{children}</div>
                </div>

                <div 
                onClick={() => setOpen(false)}
                className='fixed top-0 left-0 w-full h-full '></div>
            </div>
        }
    </>
  )
}

export default SideModal