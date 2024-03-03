'use client'
import React, { Children, useState, useEffect } from 'react'
import { MultiStepFormProvider, useStepForm } from './MultiStepFormContext'
import FormActions from './FormActions'

const FormRoot = ({ children, stepsTitle, onSubmit }) => {
    return (
        <MultiStepFormProvider initialStep={0} steps={Children.count(children)}>
            <FormContent
                children={children}
                stepsTitle={stepsTitle}
                onSubmit={onSubmit}
            />
        </MultiStepFormProvider>
    )
}

const FormContent = ({ children, stepsTitle, onSubmit }) => {
    const { step, setStep } = useStepForm()
    const [isFullFilled, setIsFullFilled] = useState(false)

    const handleSubmit = (e) => {
        try {
            e.preventDefault()
            onSubmit(e)
        } catch (error) {
            setStep(0)
        }
    }

    const checkIsFullFilled = () => {
        var inputs = document.querySelectorAll('input')
        var selects = document.querySelectorAll('select')
        var isFullFilled = true
        inputs.forEach((input) => {
            if (input.value === '') {
                isFullFilled = false
            }
        })
        selects.forEach((select) => {
            if (select.value === '') {
                isFullFilled = false
            }
        })

        return isFullFilled
    }

    useEffect(() => {
        setIsFullFilled(checkIsFullFilled())
    }, [children])

    return (
        <form
            onSubmit={handleSubmit}
            onChange={() => setIsFullFilled(checkIsFullFilled())}
            className="w-full h-full flex flex-col items-center justify-between"
        >
            <div className="flex items-center justify-center gap-x-8">
                {stepsTitle.map((title, index) => (
                    <div
                        onClick={() => {
                            if (index <= step) setStep(index)
                        }}
                        key={index}
                        className={`rounded flex items-center justify-center p-2
                        ${
                            step > index
                                ? '!bg-[#20a020] text-[#fff] font-bold card-shadow !border-none'
                                : 'bg-[#f0f0f0] dark:bg-[#333] text-[#333] dark:text-[#f0f0f0] border-[1px] dark:border-[#f0f0f0]'
                        }
                        ${
                            step === index
                                ? 'bg-[#f0f0f0] dark:!bg-[#000] text-[#333] dark:text-[#fff] font-bold shadow-[0px_0px_8px_2px_rgba(32,160,32,0.8)] !border-[#20a020]'
                                : 'bg-[#555] dark:!bg-[#000] text-[#f0f0f0] dark:text-[#fff] border-[1px] dark:border-none'
                        } ${
                            index <= step
                                ? 'cursor-pointer'
                                : 'cursor-not-allowed !text-[#000] bg-[#555] dark:bg-[#000] border-[1px] dark:border-[#f0f0f0]'
                        }`}
                    >
                        {title}
                    </div>
                ))}
            </div>
            {children[step]}
            <FormActions isFullFilled={isFullFilled} />
        </form>
    )
}

export default FormRoot
