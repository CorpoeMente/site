import React from 'react'
import { Modal } from '.'
import {
    Table,
    TableHeader,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
} from '@/components/ui/table'

const Valores = ({ valores, valorSocial }) => {
    return (
        <Modal
            buttonText={'Ver Valores'}
            title={'Valores'}
            className={
                'w-full !text-sm mb-4 bg-white border-2 border-primary !text-primary hover:!scale-100 hover:!bg-primary hover:!text-white transition ease-in-out duration-500'
            }
        >
            <Table className="w-full">
                <TableHeader>
                    <TableRow className="text-[#505050] dark:text-[#a0a0a0]">
                        <TableCell className="px-4 text-center">
                            Serviço
                        </TableCell>
                        <TableCell className="px-4 text-center">
                            Valor
                        </TableCell>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {valores.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="px-4 py-4 text-center">
                                {item.title}
                            </TableCell>
                            <TableCell className="px-4 py-4 text-center">
                                R$ {item.price.toFixed(2).replace('.', ',')}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {valorSocial && (
                <p className="text-center mt-4 font-bold">
                    * Trabalhamos com valores sociais, caso não possa pagar o
                    valor.
                </p>
            )}
            <p className="text-center mt-4 font-bold">
                * Para ver os planos de saúde que atendemos,{' '}
                <a
                    href="https://www.clinicacorpoemente.com/planos"
                    target="_blank"
                    className="text-primary hover:!underline"
                >
                    clique aqui
                </a>
                .
            </p>
        </Modal>
    )
}

export default Valores
