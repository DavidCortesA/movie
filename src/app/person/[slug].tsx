import { useParams } from "next/navigation"

export default function Page() {
  const path = useParams();
  console.log(path);
  return (
    <div>
      <h1>actor</h1>
    </div>
  )
}