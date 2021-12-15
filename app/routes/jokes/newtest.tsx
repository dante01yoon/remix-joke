import { LoaderFunction } from "remix"

export const loader: LoaderFunction = ({request}) => {
  console.log({params: request});

  return {}
}
const NewTest = () => {
  return (
    <form method="get" action="newtest">
  <fieldset>
    <legend>Brand</legend>
    <label>
      <input name="brand" value="nike" type="checkbox" />
      Nike
    </label>
    <label>
      <input name="brand" value="reebok" type="checkbox" />
      Reebok
    </label>
    <label>
      <input name="color" value="white" type="checkbox" />
      White
    </label>
    <label>
      <input name="color" value="black" type="checkbox" />
      White
    </label>
    <button type="submit">Search</button>
  </fieldset>
</form>
  )
}

export default NewTest;