'use client'
import Image from 'next/image'
import InteractiveCard from './InteractiveCard'



export default  function Card({dentistName , imgSrc, onRating  , yearsOfExperience , areaOfExpertise }:{ dentistName:string, imgSrc:string, onRating?:Function 
    , yearsOfExperience : string , areaOfExpertise : string}) {
    // let ratingName = dentistName + " Rating"

    // const [value, setValue] = useState<number | null>(5);
    
    return (
        <InteractiveCard contentName={dentistName}>
                <div className='w-full h-[70%] relative rounded-2xl'>
                    <Image src={imgSrc}
                    alt='Hospital picture'
                    fill={true}
                    className='object-cover rounded-t-2xl'
                    /> 
                </div>
                <div className="text-2xl text-slate-800 mt-3 font-semibold text-center">Doctor {dentistName}</div>
                <div className="text-xl  text-slate-800 mt-3 ml-5 font-medium text-left">Experience : {yearsOfExperience} Years</div>
                <div className="text-xl  text-slate-800 mt-3 ml-5 font-medium text-left">Expertise of : {areaOfExpertise}</div>
        </InteractiveCard>
    )
}