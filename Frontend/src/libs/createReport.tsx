
export default async function createReport(patientID:string,dentistID:string, apptID:string, apptDate:Date, treatment:string, presMed:string ,rec:string, token:string) {

    const response = await fetch('https://cedt-se-project-dentnutz-backend.vercel.app/api/v1/reports', {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({patientId: patientID, appointmentId: apptID, dentistId: dentistID, treatment: treatment, prescribed_medication: presMed, recommendations: rec, date: apptDate})
    })

    if (!response.ok) {
        throw new Error("Failed to create Report")
    }

    return await response.json()
}