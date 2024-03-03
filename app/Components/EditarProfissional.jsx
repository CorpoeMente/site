'use client'
import React, { useState, useEffect } from 'react'
import { Modal, ExperienciaProfissionalForm } from '../Components'
import { FaPencil } from 'react-icons/fa6'

const NovoProfissional = ({ profissional }) => {
    const [nome, setNome] = useState(profissional.nome)
    const [cargo, setCargo] = useState(profissional.cargo)
    // const [imagem, setImagem] = useState(profissional.imagem)
    const [descricao, setDescricao] = useState(profissional.descricao)
    const [departamento, setDepartamento] = useState(profissional.departamento)
    const [departamentos, setDepartamentos] = useState([])
    const [telefone, setTelefone] = useState(profissional.telefone)
    const [email, setEmail] = useState(profissional.email)
    const [curriculo, setCurriculo] = useState(profissional.curriculo)
    // const [imagemPreview, setImagemPreview] = useState(profissional.imagem)
    const [error, setError] = useState('')
    const [jornada, setJornada] = useState(
        profissional.jornada || {
            segunda: { inicio: '', fim: '' },
            terca: { inicio: '', fim: '' },
            quarta: { inicio: '', fim: '' },
            quinta: { inicio: '', fim: '' },
            sexta: { inicio: '', fim: '' },
            sabado: { inicio: '', fim: '' },
            domingo: { inicio: '', fim: '' },
        }
    )

    useEffect(() => {
        fetch('/api/departamentos')
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    alert(res.message)
                } else {
                    setDepartamentos(res.departamentos)
                }
            })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('_id', profissional._id)
        formData.append('nome', nome)
        formData.append('cargo', cargo)
        // formData.append('imagem', imagem)
        formData.append('descricao', descricao)
        formData.append('departamento', departamento)
        formData.append('telefone', telefone)
        formData.append('email', email)
        formData.append('curriculo', JSON.stringify(curriculo))
        formData.append('jornada', JSON.stringify(jornada))

        try {
            const response = await fetch('/api/profissionais', {
                method: 'PUT',
                body: formData,
            })

            const resJson = await response.json()
            if (resJson.error) {
                setError(resJson.message)
            } else {
                window.location.reload()
            }
        } catch (error) {
            setError('Erro ao editar profissional. Tente novamente.')
        }
    }

    // const handleImagemChange = (e) => {
    //     const file = e.target.files[0]

    //     // Validar se é uma imagem (você pode ajustar as extensões conforme necessário)
    //     const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i
    //     if (!allowedExtensions.exec(file.name)) {
    //         alert('Por favor, selecione uma imagem válida (jpg, jpeg, png).')
    //         return
    //     }

    //     // Atualizar o estado da imagem
    //     setImagem(file)

    //     // Adicionar lógica para exibir a pré-visualização da imagem
    //     const reader = new FileReader()
    //     reader.onloadend = () => {
    //         setImagemPreview(reader.result)
    //     }
    //     reader.readAsDataURL(file)
    // }

    return (
        <Modal
            buttonText={<FaPencil />}
            title={'Editar Profissional'}
            className={
                'w-auto !p-0 !m-0 !text-sm !text-[#f8be00] !bg-transparent hover:bg-[#e4a800] hover:color-[#000] dark:!text-white'
            }
        >
            <div className="flex flex-col w-full mt-auto gap-y-8 items-center justify-center">
                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 w-full">
                        <p className="font-bold">Erro</p>
                        <p>{error}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <input
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            type="text"
                            placeholder="Nome"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                            required
                        />
                        <input
                            value={cargo}
                            onChange={(e) => setCargo(e.target.value)}
                            type="text"
                            placeholder="Cargo"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                            required
                        />
                        {/* <input
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={handleImagemChange}
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                        /> */}
                        {/* Adicionar um elemento para exibir a pré-visualização da imagem */}
                        {/* {imagemPreview && (
                            <img
                                src={imagemPreview}
                                alt="Imagem Preview"
                                className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                            />
                        )}
                        */}
                        <textarea
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Descrição"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                            required
                        />
                        <select
                            value={departamento}
                            onChange={(e) => setDepartamento(e.target.value)}
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                            required
                        >
                            <option value="">Departamento</option>
                            {departamentos &&
                                departamentos.map((item, index) =>
                                    item._id === departamento ? (
                                        <option
                                            key={index}
                                            value={item._id}
                                            selected
                                        >
                                            {item.name}
                                        </option>
                                    ) : (
                                        <option key={index} value={item._id}>
                                            {item.name}
                                        </option>
                                    )
                                )}
                        </select>
                        <input
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            type="text"
                            placeholder="Telefone"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                            required
                        />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="E-mail"
                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                            required
                        />

                        <div className="flex flex-col items-center justify-center gap-8">
                            <span className="text-lg font-bold">Jornada</span>

                            <div className="grid grid-cols-[80px_1fr_1fr] gap-4 w-full">
                                <span></span>
                                <span className="text-center text-lg">
                                    Entrada
                                </span>
                                <span className="text-center text-lg">
                                    Saída
                                </span>
                                {Object.keys(jornada).map((dia, index) => (
                                    <>
                                        <span>{dia}</span>
                                        <input
                                            value={jornada[dia].inicio}
                                            onChange={(e) =>
                                                setJornada({
                                                    ...jornada,
                                                    [dia]: {
                                                        ...jornada[dia],
                                                        inicio: e.target.value,
                                                    },
                                                })
                                            }
                                            type="time"
                                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                                        />
                                        <input
                                            value={jornada[dia].fim}
                                            onChange={(e) =>
                                                setJornada({
                                                    ...jornada,
                                                    [dia]: {
                                                        ...jornada[dia],
                                                        fim: e.target.value,
                                                    },
                                                })
                                            }
                                            type="time"
                                            className="w-full border-2 border-primary rounded-lg p-2 mb-4 dark:bg-black dark:text-white"
                                        />
                                    </>
                                ))}
                            </div>
                        </div>

                        <ExperienciaProfissionalForm
                            curriculo={curriculo}
                            setCurriculo={setCurriculo}
                        />
                    </fieldset>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white rounded-lg p-2 mb-4"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
        </Modal>
    )
}

export default NovoProfissional
