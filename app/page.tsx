import Link from "next/link"

export default function Home() {
    return (
        <main className="flex min-h-full items-center justify-center bg-slate-900">
            <Link href="/launch" className="px-6 py-3 rounded-full bg-violet-600 text-white font-semibold hover:bg-violet-500">
                FHIR Pharmacy Viewer
            </Link>
        </main>
    )
}