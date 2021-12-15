import type { ActionFunction } from "remix";
import { redirect, useActionData, json } from "remix";
import { db } from "~/utils/db.server";
import { Joke } from "@prisma/client";

interface CreateData {
  data: Pick<Joke, "name" | "content">;
}

interface ActionData {
  formError?: string;
  fieldErrors?: {
    name?: string;
    content?: string;
  };
  fields?: {
    name: string;
    content: string;
  }
}

const validateJokeContent = (content: string) => {
  if(content.length < 10) {
    return `That joke is too short`;
  }
}

const validateJokeName = (name: string) => {
  if(name.length < 2 ) {
    return `That joke's name is too short`;
  }
}

const badRequest = (data: ActionData) => {
  return json(data, {status: 400})
}

// export const action: ActionFunction = async ({
//   request,
// }) => {
//   const form = await request.formData();
//   const name = form.get("name");
//   const content = form.get("content");

//   if(typeof name !== "string" || typeof content !== "string" ) {
//     return badRequest({
//       formError: `Form not submitted correctly`,
//     })
//   }

//   const fields = { name, content };
//   const fieldErrors = {
//     name: validateJokeName(name),
//     content: validateJokeContent(content),
//   };

//   if(Object.values(fieldErrors).some(Boolean)) {
//     return badRequest({fieldErrors, fields});
//   }

//   const joke = await db.joke.create<CreateData>({ data: fields});
//   return redirect(`/jokes/${joke.id}`);
// }

export default function NewJokeRoute() {
  // const actionData = useActionData<ActionData>();
  const actionData = {};
  return (
    <div>
      <p>Add your own hilarious joke</p>
      <form method="post">
        <div>
          <label>
            Name: <input 
              type="text" 
              name="name"
              // defaultValue={actionData?.fields?.name}
              // aria-required
              // aria-invalid={Boolean(actionData?.fieldErrors?.name) || undefined}
              // aria-describedby={
              //   actionData?.fieldErrors?.name
              //     ? "name-error"
              //     : undefined
              // }
            />
          </label>
          {/* {actionData?.fieldErrors?.name ? (
            <p
              className="form-validation-error"
              role="alert"
              id="name-error"
            >
              {actionData.fieldErrors.name}
            </p>
          ) : null} */}
        </div>
        <div>
          <label>
            Content: <textarea 
              name="content"
              // defaultValue={actionData?.fields?.content}
              // aria-invalid={
              //   Boolean(actionData?.fieldErrors?.content) ||
              //   undefined
              // }
              // aria-describedBy={
              //   actionData?.fieldErrors?.content
              //     ? "content-error"
              //     : undefined
              // }
            />
          </label>
          {/* {actionData?.fieldErrors?.content ? (
            <p
              className="form-validation-error"
              role="alert"
              id="content-error"
            >
              {actionData.fieldErrors.content}
            </p>
          ) : null} */}
        </div>
        <div>
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}