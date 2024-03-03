import { createContext, useState, useContext, useEffect } from 'react'

const MultiStepFormContext = createContext()

export const MultiStepFormProvider = ({ children, initialStep, steps }) => {
    const [step, setStep] = useState(initialStep)
    const totalSteps = steps
    useEffect(() => {
        setStep(initialStep)
    }, [initialStep])

    const nextStep = () => {
        if (step >= totalSteps - 1) return
        setStep(step + 1)
    }

    const prevStep = () => {
        if (step === 0) return
        setStep(step - 1)
    }

    return (
        <MultiStepFormContext.Provider
            value={{ step, setStep, totalSteps, nextStep, prevStep }}
        >
            {children}
        </MultiStepFormContext.Provider>
    )
}

export const useStepForm = () => useContext(MultiStepFormContext)
