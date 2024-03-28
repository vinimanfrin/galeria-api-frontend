import { toast } from "react-toastify";

export const useNotification = () => {

    function notify(messsage: string, level: "success" | "info" | "warning" | "error"){
        toast(messsage, {
            type: level
        })
    }

    return {
        notify
    }
}