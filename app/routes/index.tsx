import type { LinksFunction } from "remix";
import stylesUrl from "../styles/index.css";

import Button from "~/components/button";

export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: stylesUrl },
    { rel: "stylesheet", href: Button.styles},
  ];
};

export default function IndexRoute() {
  return (
    <> 
      <div>Hello Index Route</div>
      <Button/>
    </>
  )
}