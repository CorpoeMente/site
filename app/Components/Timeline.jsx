import React from 'react'

const Timeline = ({ children }) => {
    return (
        <ol className="relative left-2 xl:left-8 border-s border-gray-200 dark:border-gray-700">
            {children}
        </ol>
    )
}

export default Timeline
