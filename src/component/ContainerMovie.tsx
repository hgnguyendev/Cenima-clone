import { ListMovie } from "./ListMovie"
interface Movies {
  id?:number,
  title?:string,
  backdrop_path?:string
  release_date?:string
}
interface Props {
    title:string
    movies:Movies[]
 }
export const ContainerList= ({title,movies}:Props) => {
  return (
    <div className="w-full pr-16 pl-16 pb-16">
        <h1 className="text-2xl font-semibold pt-3 uppercase mb-3">{title}</h1>
        <ListMovie listMovie = {movies} />
    </div>
  )
}

