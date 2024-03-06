import React from "react";
import iconeGaleria from "../../public/galeria-de-fotos.png"

interface TemplateProps {
    children: React.ReactNode
}

const Template: React.FC<TemplateProps> = (props: TemplateProps) => {
    return (
        <>
            <Header/>
            <div className="container mx-auto mt-8 px-4">
                {props.children}
            </div>
            
        </>
    )
}

const Header: React.FC = () => {
    return (
        <header className="bg-slate-50 text-black py-3 shadow-md">
            <div className="container mx-auto flex items-center gap-4">
                <h1 className="text-3xl">Galeria</h1>
                <img src={iconeGaleria.src} alt="icone galeria" className="w-8 h-8" />
            </div>
        </header>
    )
}

export default Template;