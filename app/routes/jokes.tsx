import { Outlet } from "remix";
function Jokes(){
  return (
    <div>
      jokes page
      <Outlet />
    </div>
  )
}

export default Jokes;