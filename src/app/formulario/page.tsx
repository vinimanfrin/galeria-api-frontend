'use client'
import Template from "@/components/Template";
import { useImageService } from "@/resources/image/image.service";
import { Form, useFormik} from "formik";
import React, { useState } from "react";
import {formScheme, FormProps, formSchemeValidation} from "./FormSchema";

const Formulario = () => {

    const [imagePreview, setImagePreview] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const service = useImageService()

    const formik = useFormik<FormProps>({
        initialValues: formScheme,
        onSubmit: handleSubmit,
        validationSchema: formSchemeValidation
    })

    async function handleSubmit(dados: FormProps) {
        setLoading(true)
        const formData = new FormData();
        formData.append("file", dados.file);
        formData.append("name", dados.name);
        formData.append("tags", dados.tags);       
         
        await service.postar(formData)

        formik.resetForm()
        setImagePreview("")
        setLoading(false)
    }

    const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files){
            const file = event.target.files[0];
            formik.setFieldValue("file", file);
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl)
        }
    }

    return (
        <Template loading={loading}>
            <div className="max-w-md mx-auto py-4">
                <form onSubmit={formik.handleSubmit} className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Nome
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Nome" onChange={formik.handleChange} value={formik.values.name}/>
                        <span className="text-red-500">{formik.errors.name}</span>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Tag
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="tags" type="text" placeholder="adicione uma tag para a imagem" onChange={formik.handleChange} value={formik.values.tags}/>
                        <span className="text-red-500">{formik.errors.tags}</span>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Imagem
                            
                        </label>
                        <span className="block text-red-500">{formik.errors.file}</span>
                        <div className="flex items-center border-b border-b-2 border-gray-500 py-2">
                            <input onChange={onFileUpload} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="file" placeholder="Upload de imagem" aria-label="Image"/>
                            
                            {imagePreview ? <img src={imagePreview} width={250} className="rounded-md"/> : 
                                <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                </svg>
                            }
                            
                            
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Enviar
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>

        </Template>
    )
}

export default Formulario;