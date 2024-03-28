import * as yup from "yup";

export interface FormProps {
    name: string;
    tags: string;
    file: string | Blob
}

export const formScheme: FormProps = {name: "", tags: "", file: ""}

export const formSchemeValidation = yup.object().shape({
    name: yup
            .string()
            .trim()
            .required("O campo nome precisa ser preenchido!")
            .max(50, "O campo nome aceita apenas 50 caracteres!"),

    tags: yup
            .string()
            .trim()
            .required("O campo tags precisa ser preenchido!")
            .max(50, "O campo tags aceita apenas 50 caracteres!"),

    file: yup
            .mixed<Blob>()
            .required("Selecione uma imagem para o upload!")
            .test("size", "A imagem precisa ser menor que 10MB", (file) => {
                return file.size < 10000000;
            })
            .test("type", "Seleciona apenas imagens no formato: jpeg, giff ou png", (file) => {
                return file.type === "image/jpeg" || file.type === "image/gif" || file.type === "image/png";
            })

    })

    
    