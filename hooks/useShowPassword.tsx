import { useState } from "react"

const useShowPassword = () => {
    const [show, setShow] = useState<boolean>(false)
    const [showConfirm, setshowConfirm] = useState<boolean>(false)

    const toggleShow = () => setShow(prev => !prev)
    const toggleShowConfirm = () => setshowConfirm(prev => !prev)

    return { show, showConfirm, toggleShow, toggleShowConfirm }
}

export default useShowPassword
