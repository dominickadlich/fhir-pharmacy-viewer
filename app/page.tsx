import Link from "next/link"

export default function Home() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-900">
            <Link href="/launch" className="px-6 py-3 rounded-full bg-cyan-600 text-white font-semibold hover:bg-cyan-500">
                FHIRMACY VIEWER
            </Link>
        </main>
    )
}