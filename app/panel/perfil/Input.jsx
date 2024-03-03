import React from 'react'
import InputMask from 'react-input-mask'

const Input = ({ name, type, value, onChange, mask }) => {
    return (
        <div className="flex flex-col items-start justify-center">
            <label className="text-lg dark:text-white">{name}</label>
            {mask ? (
                <InputMask
                    mask={mask}
                    type={type}
                    className="w-full border rounded-lg p-2 dark:bg-black dark:text-white"
                    value={value}
                    onChange={onChange}
                />
            ) : (
                <input
                    type={type}
                    className="w-full border rounded-lg p-2 dark:bg-black dark:text-white"
                    value={value}
                    onChange={onChange}
                />
            )}
        </div>
    )
}

export default Input
