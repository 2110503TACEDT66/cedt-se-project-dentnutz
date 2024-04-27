import Link from "next/link"
import Card from "./Card"
import { DentistJson } from "../../interface"

export default async function DentistCatalog({dentistsJson} : {dentistsJson: Promise<DentistJson>}) {

    const dentistsJsonReady = await dentistsJson

    return (

        <div className="container mx-auto">
            <div className="flex flex-wrap justify-left"  >
                {
                    dentistsJsonReady.data.map( (dentistItem) => (
                   
                    <Link href={`/dentist/${dentistItem._id}`} className="ml-10 mx-5 mb-10 mt-10 transition ease-in-out hover:scale-105">
                        <Card key={dentistItem._id} dentistName={dentistItem.name} imgSrc={dentistItem.picture}
                         areaOfExpertise ={dentistItem.areaOfExpertise} yearsOfExperience={dentistItem.yearsOfExperience} />
                    </Link>
                    )
                )
                }
            </div>
        </div>
    )
}