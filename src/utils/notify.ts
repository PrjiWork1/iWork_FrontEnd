import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastTypes = "success" | "error" | "warning" | "info";

export function notify(type: ToastTypes, message: string) {
    switch (type) {
        case "success":
            toast.success(`${message}`);
            break;
        case "error":
            toast.error(`${message}`);
            break;
        case "info":
            toast.info(`${message}`);
            break;
        case "warning":
            toast.warning(`${message}`);
            break;
    }
}