export default function CuisineCard({title, img, description}){
return (
    <div className="w-95 h-98.75 text-black space-y-8">
        <div>
            <img src={img} alt={`Picture of ${title}`} className="w-95 h-58.5 object-cover "/>
        </div>
        <div className="flex-col items-center space-y-6">
        <h1 className="text-4xl">{title}</h1>
        <p>{description}</p>
        </div>
    </div>
)
}