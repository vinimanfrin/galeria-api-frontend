'use client'

import Template from "@/components/Template";
import ImageCard from "@/components/ImageCard";
import { useEffect, useState } from "react";
import Image from "@/resources/image/image.resource";
import { useImageService } from "@/resources/image/image.service";


const Home = () => {

  const [images,setImages] = useState<Image[]>([])

  async function getImages(){
    const result = await useImageService().buscar();
    setImages(result);
  }

  function renderImageCard(image: Image) {
    return <ImageCard key={image.name} name={image.name} size={image.size} uploadDate={image.uploadDate} src={image.url} />
  }

  function renderImages(){
    return images.map((image) => renderImageCard(image));
  }

  useEffect(() => {
    getImages()
  }, [])

  return (
    <Template>
      <section className="grid grid-cols-4 gap-8">
        {images.length ? renderImages() : <h1>Sem imagens disponíveis</h1>}
      </section>
    </Template>
  );
}

export default Home;