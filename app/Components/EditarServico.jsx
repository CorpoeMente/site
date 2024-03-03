'use client'
import React, { useState, useEffect } from 'react'
import { Modal, ValorServicoForm } from '../Components'
import { FaPencil } from 'react-icons/fa6'
import { MultiSelect } from 'react-multi-select-component'
import { usePathname } from 'next/navigation'

const EditarServico = ({ servico }) => {
    const [nome, setNome] = useState(servico.nome)
    const [type, setType] = useState(servico.type)
    const [descricao, setDescricao] = useState(servico.descricao)
    const [duracao, setDuracao] = useState(servico.duracao || 0)
    const [departamento, setDepartamento] = useState(servico.departamento._id)
    const [valores, setValores] = useState(servico.valores || [])
    const [valorSocial, setValorSocial] = useState(servico.valorSocial || false)
    const [responsaveis, setResponsaveis] = useState([])

    const [departamentos, setDepartamentos] = useState([])
    const [profissionais, setProfissionais] = useState([])
    const [message, setMessage] = useState('')

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

        fetch('/api/profissionais')
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    //
                } else {
                    setProfissionais(res)
                }
            })

        if (servico.profissionais && servico.profissionais.length > 0) {
            const responsaveis = servico.profissionais.map((profissional) => {
                return {
                    nome: profissional.nome,
                    _id: profissional._id,
                }
            })
            setResponsaveis(responsaveis)
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('/api/servicos', {
            method: 'PUT',
            body: JSON.stringify({
                id: servico._id,
                duracao,
                nome,
                type,
                descricao,
                departamento,
                valores,
                valorSocial,
                profissionais: getArrayOfProfissionais(responsaveis),
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    setMessage('Erro ao editar serviço')
                } else {
                    window.location.reload()
                }
            })
    }

    const getArrayOfProfissionais = (profissionais) => {
        return profissionais.map((profissional) => profissional._id)
    }

    return (
        <Modal
            buttonText={<FaPencil />}
            title={'Editar Serviço'}
            className={
                'w-auto !p-0 !m-0 !text-sm !bg-transparent hover:bg-transparent dark:hover:text-[#fff] dark:!text-[#fff] !text-[#f8be00]'
            }
        >
            <div className="flex flex-col w-full mt-auto gap-y-8 items-center justify-center">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <input
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            type="text"
                            placeholder="Nome"
                            className="w-full border-2 border-primary dark:bg-black rounded-lg p-2 mb-4"
                            required
                        />
                        <textarea
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Descrição"
                            className="w-full border-2 border-primary dark:bg-black rounded-lg p-2 mb-4"
                            required
                        />
                        <input
                            value={duracao}
                            onChange={(e) => setDuracao(e.target.value)}
                            type="number"
                            step={10}
                            placeholder="Duração"
                            className="w-full border-2 border-primary dark:bg-black rounded-lg p-2 mb-4"
                            required
                        />
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full border-2 border-primary dark:bg-black rounded-lg p-2 mb-4"
                            required
                        >
                            <option value="">Tipo</option>
                            <option value="servico">Serviço</option>
                            <option value="exame">Exame</option>
                        </select>
                        <select
                            value={departamento}
                            onChange={(e) => setDepartamento(e.target.value)}
                            className="w-full border-2 border-primary dark:bg-black rounded-lg p-2 mb-4"
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
                        {profissionais && profissionais.length > 0 && (
                            <MultiSelect
                                options={profissionais?.map((profissional) => ({
                                    label: profissional.nome,
                                    value: profissional._id,
                                }))}
                                value={responsaveis?.map((profissional) => ({
                                    label: profissional.nome,
                                    value: profissional._id,
                                }))}
                                onChange={(e) => {
                                    setResponsaveis(
                                        e.map((profissional) => ({
                                            nome: profissional.label,
                                            _id: profissional.value,
                                        }))
                                    )
                                }}
                                overrideStrings={{
                                    selectSomeItems:
                                        'Selecione os profissionais que exercem este serviço',
                                    search: 'Buscar',
                                    allItemsAreSelected:
                                        'Todos os profissionais selecionados',
                                    selectAll: 'Selecionar todos',
                                    selectAllFiltered:
                                        'Selecionar todos os resultados da busca',
                                    noOptions: 'Nenhum resultado',
                                    clearSearch: 'Limpar busca',
                                }}
                                className="w-full border-2 border-primary dark:bg-black rounded-lg p-2 mb-4 dark:text-white"
                            />
                        )}

                        <div className="flex items-center justify-start gap-x-4 my-4">
                            <label>Valor Social:</label>
                            <input
                                type="checkbox"
                                checked={valorSocial}
                                onChange={(e) =>
                                    setValorSocial(valorSocial ? false : true)
                                }
                                className="border-2 border-primary dark:bg-black rounded-lg p-2"
                            />
                        </div>
                        <ValorServicoForm
                            valores={valores}
                            setValores={setValores}
                        />
                    </fieldset>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white rounded-lg p-2 mb-4"
                    >
                        Salvar
                    </button>
                </form>
            </div>
        </Modal>
    )
}

export default EditarServico
