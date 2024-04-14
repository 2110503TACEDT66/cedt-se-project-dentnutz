export default async function updateReport(appID:string ,dentist:string, prescribe:string , recommend:string, date:string, token:string) {

    const response = await fetch(`https://cedt-se-project-dentnutz-backend.vercel.app/api/v1/reports/${appID}`, {
        method: 'PUT',
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({appDate: date, dentist: dentist})
    })

    if (!response.ok) {
        throw new Error("Failed to update appointment")
    }

    return await response.json()
}