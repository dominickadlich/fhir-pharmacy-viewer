// src/components/PatientHeader.tsx
// Props mirror the ParsedPatient interface from parsers.ts

interface PatientHeaderProps {
    patient: {
        id: string;
        name: string;
        initials: string;
        dob: string;
        gender: string;
        mrn: string;
    };
    allergyCount: number;
    medicationCount: number;
}

function calculateAge(dob: string): number {
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
    return age;
}

function formatDOB(dob: string): string {
    const [year, month, day] = dob.split("-");
    return `${month}/${day}/${year}`;
}

export default function PatientHeader({ patient, allergyCount, medicationCount }: PatientHeaderProps) {
    const age = patient.dob ? calculateAge(patient.dob) : null;

    return (
        <div className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">

            {/* Cover banner */}
            <div className="h-28 w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 relative">
                <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)" }}
                />
            </div>

            {/* Profile section */}
            <div className="px-6 pb-5">
                <div className="flex items-end justify-between -mt-10 mb-4">

                    {/* Avatar */}
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-2xl font-bold text-white ring-4 ring-slate-900 shadow-xl select-none">
                            {patient.initials}
                        </div>
                        <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full ring-2 ring-slate-900" title="Active patient" />
                    </div>

                    {/* MRN badge */}
                    <div className="mb-1 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400 tracking-wider">
                        MRN {patient.mrn || patient.id.slice(0, 8).toUpperCase()}
                    </div>
                </div>

                {/* Name + demographics */}
                <div className="space-y-1 mb-5">
                    <h1 className="text-xl font-bold tracking-tight text-white">{patient.name}</h1>
                    <p className="text-sm text-slate-400">
                        {patient.gender?.charAt(0).toUpperCase() + patient.gender?.slice(1)}
                        {age !== null && <span> &middot; {age} yrs</span>}
                        {patient.dob && <span> &middot; DOB {formatDOB(patient.dob)}</span>}
                    </p>
                </div>
            </div>
        </div>
    );
}