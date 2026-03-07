export const NEBRASKA_MEDICINE_RENAL_POLICY = `
    Acyclovir: 
        PO:
            200 mg PO 5x/day
            400 mg PO 5x/day
            800 mg PO 5x/day
            400 mg PO q12h
                CrCl 0-10: Same dose q12h
                CrCl 11-25: Same dose q8h
                CrCl 0-10: Same dose q12h
                CrCl 11-25: Same dose q8h
                CrCl 0-10: Same dose q12h
                CrCl 0-10: 200 mg q12h

        IV
            Mucocutaneous:
                5 mg/kg (AdjBW) IV q8h
                HSV encephalitis or varicella zoster:
                    CrCl 25-50: Same dose q12h
                    CrCl 10-24: Same dose q24h
                    CrCl <10: 2.5-3.1 mg/kg IV q24h
                    
            virus:
                10 mg/kg (AdjBW) IV q8h:
                    CrCl 25-50: Same dose q12h
                    CrCl 10-24: Same dose q24h
                    CrCl <10: 5-6.2 mg/kg IV q24h


    Amoxicillin:
        Standard dose: 
            875mg q12h or 500mg q8h:
                CrCl 10-30: 500 mg q12h
                CrCl <10: 500 mg q24h

        High dose: 
            1000mg q8h (Pneumonia, uncomplicated bacteremia)
                CrCl 10-30: 1000 mg q12h
                CrCl <10: 500 mg q12h


    Cefazolin:
        Standard dose:
            2 g IV q8h

            For patients with augmented renal
            clearance (CrCl>130) and systemic
            infections consider 2 g IV q6h

            Simple UTI:
                1 g IV q8h

                CrCl 10-30: Same dose q12h
                CrCl <10: 1000mg q24H

    Cefepime:
        Standard dose: 1 g IV q6h
            CrCl 30-50: 1 g IV q8h
            CrCl 10-29: 1 g IV q12h
            CrCl < 10: 1 g IV q24h
    
    Daptomycin:
        Bacteremia, osteomyelitis and other severe infections: 6 mg/kg IV q24h
        
        UTI or skin/skin structure infection: 4 mg/kg IV q24h

        CrCl <30: Same dose q48h

    Fluconazole:
        Invasive candidiasis (susceptible C. albicans, C. tropicalis, C. parapsilosis or susceptible dose-dependent C. glabrata with MIC < 4)):
        800 mg (12 mg/kg) load x 1 dose
        then 400 mg (6 mg/kg) PO/IV q24h

        Invasive candidiasis:
        CrCl <50: 800 mg (12 mg/kg)
        load then 200 mg (3 mg/kg)
        q24h
        HD: 800 mg (12 mg/kg) load
        then 400 mg (6 mg/kg) after HD
        3x/week
        PD: 800 mg (12 mg/kg) load
        then 200 mg (3 mg/kg) q24h


    Vancomycin IV:
        Standard dose: 15-20 mg/kg IV q12h
        Consider 25 mg/kg x 1 loading dose in critically ill patients

        Dosing, therapeutic goals, and monitoring should be individualized
        for each patient to achieve AUC 400-600 (troughs typically 12-16 mcg/mL).

        CrCl < 15 or PD: Measure serum levels to determine when to dose.
        HD: Follow nephrology protocol.

        Note: Vancomycin requires pharmacokinetic consult per IP 009.
        Frequency adjustment is based on serum levels, not fixed CrCl thresholds.
`