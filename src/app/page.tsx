'use client'

import Template from "@/components/Template";
import ImageCard from "@/components/ImageCard";
import { useState } from "react";
import Image from "@/resources/image/image.resource";
import { useImageService } from "@/resources/image/image.service";
import Link from "next/link";
import { useNotification } from "@/components/Notification";

const Home = () => {
  const service = useImageService();
  const notification = useNotification();
  const [images,setImages] = useState<Image[]>([])
  const [query,setQuery] = useState<string>('')
  const [extension,setExtension] = useState<string>('')
  const [loading,setLoading] = useState<boolean>(false)

  async function getImages(){
    setLoading(true)
    const result = await service.buscar(query,extension);
    setImages(result);
    setLoading(false)

    if(!result.length) notification.notify("Nenhuma imagem encontrada", "warning")
  }

  function renderImageCard(image: Image) {
    return <ImageCard key={image.url} name={image.name} size={image.size} uploadDate={image.uploadDate} src={image.url} extension={image.extension} />
  }

  function renderImages(){
    return images.map((image) => renderImageCard(image));
  }

  return (
    <Template loading={loading}>
      <section className="flex flex-col items-center justify-center my-5">
        <div className="flex space-x-4">
          <input type="text" onChange={event => setQuery(event.target.value)} placeholder="Filtrar" className="border px-5 py-2 rounded-lg text-gray-900 shadow-lg" />
          <select onChange={event => setExtension(event.target.value)} className="border px-4 py-2 rounded-lg text-gray-900 shadow-lg">
            <option value="">Todas</option>
            <option value="PNG">PNG</option>
            <option value="JPEG">JPEG</option>
            <option value="GIF">GIF</option>
          </select>
          <button className="rounded-full shadow-md px-4 py-2 bg-blue-500 text-white hover:bg-blue-600" onClick={getImages}>Pesquisar</button>
          <Link href="/formulario">
            <button className="rounded-full shadow-md px-4 py-2 bg-purple-600 text-white hover:bg-purple-700">Enviar nova Imagem</button>
          </Link> 
        </div>
      </section>

      <section className="grid grid-cols-4 gap-8">
        {images.length ? renderImages() : <h1>Sem imagens disponíveis</h1>}
      </section>
    </Template>
  );
}

export default Home;