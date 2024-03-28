import Image from "./image.resource";
import { useNotification } from "@/components/Notification";

class ImageService {
    baseURL: string = "http://localhost:8080/image";

    async buscar(query:string = "", extension:string = ""):Promise<Image[]> {
        const url = `${this.baseURL}?query=${query}&extension=${extension}`
        const response = await fetch(url);
        return await response.json();
    }

    async postar(dados : FormData) : Promise<string> {
        const notification = useNotification();
        const response = await fetch(this.baseURL, {
            method: 'POST',
            body: dados
        })

        if(response.status === 201){
            notification.notify("Imagem cadastrada com sucesso!", "success")
        }
        
        return response.headers.get("location") ?? ''
    }
}

export const useImageService = () => new ImageService();