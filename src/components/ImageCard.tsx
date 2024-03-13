'use client'

import { MdDownload } from "react-icons/md";

interface ImageCardProps {
    name?: string;
    size?: number;
    uploadDate?: string;
    src?: string;
}

const download = (src?:string) => {
    window.open(src)
}

const formatBytes = (bytes: number = 0, decimals = 2) => {
    if (!+bytes) return '0 Bytes'
 
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
 
    const i = Math.floor(Math.log(bytes) / Math.log(k))
 
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

const ImageCard: React.FC<ImageCardProps> = (props: ImageCardProps) => {
    return (
        <div className="card relative bg-slate-200 rounded-md shadow-md transition-transform ease-in duration-300 transform hover:shadow-lg hover:-translate-y-2">
            <img src={props.src} alt={props.name} className="h-56 w-full object-cover rounded-t-md" />
            <div className="card-body p-4">
                <h5 className="text-xl font-semibold mb-2 text-gray-600">{props.name}</h5>
                <p className="text-gray-600">Tamanho: {formatBytes(props.size,2)}</p>
                <p className="text-gray-600">Data de Upload: {props.uploadDate}</p>

                <div className="flex justify-between pt-4">
                    <button onClick={() => download(props.src)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded"><MdDownload/></button>
                </div>
            </div>
           
        </div>
    )
}

export default ImageCard;