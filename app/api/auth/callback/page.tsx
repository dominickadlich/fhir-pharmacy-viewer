'use client'

import getPatientData from "@/app/lib/fhir";
import { useEffect, useRef } from "react"


export default function CallbackPage() {
    const isReadyCalled = useRef(false)

    useEffect(() => {
        // This stops the second 'double-fire' in Next.js Dev mode
        if (isReadyCalled.current) return; 
        isReadyCalled.current = true;

        getPatientData().then(data => {
            console.log(data)
        })
    }, []);

    return <div>Completing authorization...</div>
}