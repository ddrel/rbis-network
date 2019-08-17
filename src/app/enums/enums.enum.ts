export enum roadclassification {
    roadsection="roadsection",
    roadcondition="roadcondition",
    roadsurfacetype="roadsurfacetype",
    none="none"

}
export enum importance{
    "Core"="CORE",
    "Non-Core"="NON-CORE",
    "Unknown"="UNKNOWN"
}
export enum environment{
        U="URBAN (METROPOLITAN)",
        N="URBAN (NON-METROPOLITAN)",
        R="RURAL",
}
export enum directionflow{
    "One-Way"="ONE-WAY",
    "Two-Way"= "TWO-WAY"
} 
export enum terrain{
    F="FLAT",
    R="ROLLING",
    M="MOUNTAINOUS"
} 

export enum pavementtype{
            AMGB="Asphalt Mix on Granular Base",
            AMAB="Asphalt Mix on Asphalt Base",
            AMAP="Asphalt Mix on Asphalt Pavement",
            AMCP="Asphalt Mix on Concrete Pavement",
            JPCD="Joint Plain Concrete Pavement+ Dowel",
            JPCO="Joint Plain Concrete Pavement w/o Dowel",
            CRCP="Continous Reinforced Concrete Pavement",
            AMCRCP="Asphalt Mix Continous Reinforced Concrete Pavement",
            SBST="Single Bituminous Surface Treatment",
            DBST="Double Bituminous Surface Treatment",
            SS="Slurry Seal",
            G="Gravel",
            E="Earth",
            None="NONE",
            NONE="NONE",
            Unknown="UNKNOWN",
            UNKNOWN="UNKNOWN"
}


export enum roadcondition{
            N="NEW",
            G="GOOD",
            F="FAIR",
            P="POOR",
            B="BAD"
 }

 export enum surfacetype {
                C="CONCRETE",
                A="ASPHALT",
                G="GRAVEL",
                E="EARTH",
                M="MIXED"
  }; 