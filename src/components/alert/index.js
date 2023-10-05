import Swal from "sweetalert2";
import axios from "axios";

const toastSuccess = (title) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: title
    })
}

const toastError = (title) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'error',
        title: title
    })
}

const modalCreateCategory = async () => {
    const { value: text } = await Swal.fire({
        title: 'Tên danh mục',
        input: 'text',
        inputLabel: 'Nhập tên danh mục!',
        cancelButtonText: 'Huỷ'
    })

    const value = {
        name: text,
    }

    if (text) {
        try {
            await axios.post('http://localhost:8081/default/category/save', value)
            Swal.fire(`Tạo thành công danh mục: ${text}`)
        } catch {
            toastError("Không tạo được danh mục!")
        }
    }
}

export {toastSuccess, toastError, modalCreateCategory};