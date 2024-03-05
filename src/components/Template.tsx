import React from "react";

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
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-3xl">Images API</h1>
            </div>
        </header>
    )
}

export default Template;