'use client'
import React, { useState, useEffect } from 'react'
import { Toaster } from '.'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

const DynamicTable = ({ data, columns, actions }) => {
    if (!data || !columns) return null
    const [tableData, setTableData] = useState(data)
    const [sortKey, setSortKey] = useState(null)
    const [sortDirection, setSortDirection] = useState('asc')
    const [selected, setSelected] = useState([])
    const [selectAll, setSelectAll] = useState(false)
    const [selectedAction, setSelectedAction] = useState(null)

    const handleSortByKey = (key) => {
        const direction =
            sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc'

        const sorted = [...tableData].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
            return 0
        })

        setSortKey(key)
        setSortDirection(direction)
        setTableData(sorted)
    }

    useEffect(() => {
        setTableData(data)
    }, [data])

    const handleSearch = (e) => {
        const search = e.target.value
        const filtered = data.filter((item) => {
            return Object.keys(item).some((key) => {
                return item[key]
                    .toString()
                    .toLowerCase()
                    .includes(search.toLowerCase())
            })
        })
        setTableData(filtered)
    }

    useEffect(() => {
        if (selected.length === tableData.length) {
            setSelectAll(true)
        } else {
            setSelectAll(false)
        }
    }, [selected, selectAll, tableData])

    const handleSelectAll = () => {
        if (selectAll) {
            setSelected([])
            setSelectAll(false)
        } else {
            setSelected([...tableData])
            setSelectAll(true)
        }
    }

    const handleSelect = (item) => {
        if (selected.includes(item)) {
            setSelected(
                selected.filter((selectedItem) => selectedItem !== item)
            )
        } else {
            setSelected([...selected, item])
        }
    }

    const handleMassAction = async (action) => {
        if (!action) return
        await Promise.all(selected.map((item) => action.handleAction(item)))
        window.location.reload()
    }
    if (tableData.length === 0) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <p>Nenhum dado encontrado</p>
            </div>
        )
    }
    return (
        <div className="flex flex-col items-center justify-start h-full gap-y-4 w-full mt-8 overflow-auto">
            <div className="col-span-1 row-span-1 grid grid-cols-3 items-center w-full gap-x-8">
                <fieldset className="grid grid-cols-3 items-center gap-x-4 w-2/3 col-span-2">
                    <select
                        onChange={(e) => setSelectedAction(e.target.value)}
                        className="flex items-center justify-start gap-4 col-span-2 dark:bg-[#000] dark:text-white rounded border-2 border-gray-300 dark:border-gray-700"
                    >
                        <option value="">Ações em massa</option>
                        {actions.map((action, index) => {
                            if (
                                (typeof action.showCondition !== 'undefined' &&
                                    action.showCondition === false) ||
                                (action.custom !== 'undefined' && action.custom)
                            )
                                return null
                            return (
                                <option key={index} value={action.key}>
                                    {action.label}
                                </option>
                            )
                        })}
                    </select>
                    <button
                        onClick={() =>
                            handleMassAction(
                                actions.find(
                                    (action) => action.key === selectedAction
                                )
                            )
                        }
                        className="w-1/2 text-white rounded p-2 bg-secondary dark:bg-[#000] border dark:border-[#fff] transition ease-in-out duration-300 dark:hover:bg-white dark:hover:text-black"
                    >
                        Aplicar
                    </button>
                </fieldset>
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    className="border-2 border-gray-200 dark:border-gray-700 rounded-md p-2 w-full dark:bg-[#000] dark:text-white focus:outline-none focus:border-gray-400 transition-all duration-200 ease-in-out"
                    onChange={handleSearch}
                />
            </div>

            <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 dark:text-white min-h-min">
                <TableHeader>
                    <TableRow className="text-[#505050] dark:text-[#a0a0a0]">
                        <TableHead className="px-4 text-center py-2">
                            <input
                                type="checkbox"
                                onChange={handleSelectAll}
                                checked={selectAll}
                            />
                        </TableHead>
                        {columns.map((column) => (
                            <TableHead
                                key={column.key}
                                onClick={() => handleSortByKey(column.key)}
                                className="px-4 text-center py-2 cursor-pointer"
                            >
                                {column.label}
                                {sortKey === column.key && (
                                    <span>
                                        {sortDirection === 'asc' ? ' ▲' : ' ▼'}
                                    </span>
                                )}
                            </TableHead>
                        ))}
                        <TableHead className="px-4 text-center py-2"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableData &&
                        tableData.length > 0 &&
                        tableData.map((rowData, index) => (
                            <TableRow key={index}>
                                <TableCell className="px-4 text-center py-2">
                                    <input
                                        type="checkbox"
                                        onChange={() => handleSelect(rowData)}
                                        checked={selected.includes(rowData)}
                                    />
                                </TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.key}
                                        className={`px-4 text-center py-2 ${
                                            column.formatStyle
                                                ? column.formatStyle(
                                                      rowData[column.key]
                                                  )
                                                : ''
                                        }`}
                                    >
                                        {column.format
                                            ? column.format(rowData[column.key])
                                            : rowData[column.key]}
                                    </TableCell>
                                ))}
                                <TableCell className="flex items-center justify-center gap-4 text-center p-2">
                                    {actions.map((action, actionIndex) => {
                                        if (
                                            typeof action.showCondition !==
                                                'undefined' &&
                                            action.showCondition === false
                                        )
                                            return null
                                        if (!action.custom) {
                                            return (
                                                <Toaster
                                                    key={actionIndex}
                                                    message={`${action.message}`}
                                                    description={`The ${action.label.toLowerCase()} was successful.`}
                                                    action={() =>
                                                        action.handleAction(
                                                            rowData
                                                        )
                                                    }
                                                >
                                                    {action.icon}
                                                </Toaster>
                                            )
                                        }
                                        return action.render(rowData)
                                    })}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default DynamicTable
