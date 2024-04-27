
export default async function addAppointment(dentistID:string, appDate:string , token:string) {

    const response = await fetch(`https://cedt-se-project-dentnutz-backend.vercel.app/api/v1/dentists/${dentistID}/appointments`, {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({appDate: appDate})
    })

    if (response.status == 400) {
        throw new Error("Cannot book more than 1 appointment")
    }
    else if (response.status == 404) {
        throw new Error("Appointment date and dentist already exists")
    }
    else if(!response.ok){
        throw new Error("Failed to add appointment")
    }

    return await response.json()
}