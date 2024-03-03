import React from 'react'
import { useStepForm } from './MultiStepFormContext'

const FormActions = ({ isFullFilled }) => {
    const { step, prevStep, nextStep, totalSteps } = useStepForm()
    return (
        <div className="grid grid-cols-3 gap-x-8 w-full">
            {step > 0 && (
                <input
                    type="button"
                    className="bg-[#555] dark:bg-[#333] text-[#fff] dark:text-[#f0f0f0] px-4 py-2 rounded-lg cursor-pointer"
                    onClick={prevStep}
                    disabled={step === 0}
                    value={'Anterior'}
                />
            )}

            {isFullFilled && step < totalSteps - 1 && (
                <input
                    type="button"
                    className="bg-[#555] dark:bg-[#333] text-[#fff] dark:text-[#f0f0f0] px-4 py-2 rounded-lg col-start-3 cursor-pointer"
                    onClick={nextStep}
                    value={'Próximo'}
                />
            )}

            {isFullFilled && step === totalSteps - 1 && (
                <input
                    type="submit"
                    className="bg-[#202020] dark:bg-[#fff] text-[#fff] dark:text-[#000] px-4 py-2 rounded-lg justify-self-center cursor-pointer w-full col-span-1 col-start-3"
                    value={'Enviar'}
                />
            )}
        </div>
    )
}

export default FormActions
