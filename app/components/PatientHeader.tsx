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
        <div className="grid justify-items-center w-full text-white pb-5">

            {/* Cover banner */}
            {/* <div className="h-28 w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 relative">
                <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)" }}
                />
            </div> */}

            {/* Profile section */}
            <div className="">
                <div className="justify-between">

                    {/* Avatar */}
                    <div className="grid justify-items-center p-2">
                        <div className="w-20 h-20 rounded-full bg-violet-600 flex items-center justify-center text-2xl font-bold text-white ring-4 ring-slate-900 shadow-xl select-none">
                            {patient.initials}
                        </div>
                        <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full ring-2 ring-slate-900" title="Active patient" />
                    </div>

                    <h1 className="grid justify-items-center text-xl font-bold tracking-tight text-white p-2">{patient.name}</h1>

                    {/* MRN badge */}
                    <div className="grid justify-items-center mb-1 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400 tracking-wider">
                        MRN {patient.mrn || patient.id.slice(0, 8).toUpperCase()}
                    </div>
                </div>

                {/* Name + demographics */}
                <div className="grid justify-items-center space-y-1 mt-2">
                    <p className="text-sm text-slate-400">
                        {patient.dob && <span> DOB: {formatDOB(patient.dob)}</span>}
                        </p>
                        <p className="text-sm text-slate-400">
                        {patient.gender?.charAt(0).toUpperCase() + patient.gender?.slice(1)}
                        {age !== null && <span> &middot; {age} yrs</span>}
                    </p>
                </div>
            </div>
        </div>
    );
}