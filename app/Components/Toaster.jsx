'use client'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

export default function Sonner({
    children,
    message,
    label,
    cancelAction,
    action,
}) {
    return (
        <Button
            variant="link"
            className="!p-0 m-0 hover:no-underline"
            onClick={() => {
                toast(message, {
                    action: cancelAction
                        ? {
                              label: label,
                              onClick: cancelAction,
                          }
                        : false,
                    closeButton: true,
                })
                action()
            }}
        >
            {children}
        </Button>
    )
}
