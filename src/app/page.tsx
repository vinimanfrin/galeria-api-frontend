'use client'

import Template from "@/components/Template";
import ImageCard from "@/components/ImageCard";
import { useState } from "react";
import Image from "@/resources/image/image.resource";
import { useImageService } from "@/resources/image/image.service";


const Home = () => {

  const [images,setImages] = useState<Image[]>([])
  const [query,setQuery] = useState<string>('')
  const [extension,setExtension] = useState<string>('')

  async function getImages(){
    const result = await useImageService().buscar(query,extension);
    setImages(result);
  }

  function renderImageCard(image: Image) {
    return <ImageCard key={image.url} name={image.name} size={image.size} uploadDate={image.uploadDate} src={image.url} />
  }

  function renderImages(){
    return images.map((image) => renderImageCard(image));
  }

  return (
    <Template>
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
          <button className="rounded-full shadow-md px-4 py-2 bg-purple-600 text-white hover:bg-purple-700">Enviar nova Imagem</button>
        </div>
      </section>

      <section className="grid grid-cols-4 gap-8">
        {images.length ? renderImages() : <h1>Sem imagens disponíveis</h1>}
      </section>
    </Template>
  );
}

export default Home;