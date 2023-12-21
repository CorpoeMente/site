import React from 'react'

const Table = ({ headers, className = '', children }) => {
    return (
        <table
            className={`table-auto border-[1px] border-[#d0d0d0] ${className}`}
        >
            <thead className="border-b-[1px]">
                <tr>
                    {headers.map((header, index) => (
                        <th key={index} className="px-4 py-4">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="[&>*:nth-child(odd)]:bg-white [&>*:nth-child(even)]:bg-[#f1f1f1]">
                {children}
            </tbody>
        </table>
    )
}

export default Table
