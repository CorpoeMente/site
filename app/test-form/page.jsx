import React from 'react'
import { FormRoot } from '@/app/Components/MultiStepForm'
const page = () => {
    return (
        <div>
            <FormRoot stepsTitle={['Step 1', 'Step 2', 'Step 3']}>
                <div>Step 1</div>
                <div>Step 2</div>
                <div>Step 3</div>
            </FormRoot>
        </div>
    )
}

export default page
