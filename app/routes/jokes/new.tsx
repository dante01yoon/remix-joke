import type { ActionFunction } from "remix";
import { redirect, useActionData, json, useTransition, Form } from "remix";
import { db } from "~/utils/db.server";
import { Joke } from "@prisma/client";
import { Transition } from "@remix-run/react/transition";
import React from "react";
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

export const action: ActionFunction = async ({
  request,
}) => {
  const form = await request.formData();
  const name = form.get("name");
  const content = form.get("content");

  if(typeof name !== "string" || typeof content !== "string" ) {
    return badRequest({
      formError: `Form not submitted correctly`,
    })
  }
  
  const fields = { name, content };
  const fieldErrors = {
    name: validateJokeName(name),
    content: validateJokeContent(content),
  };

  if(Object.values(fieldErrors).some(Boolean)) {
    return badRequest({fieldErrors, fields});
  }
  const timer = new Promise((resolve) => {
    setTimeout(async () => {
      // const joke = await db.joke.create<CreateData>({ data: fields});
      resolve({id: "11234563434124"} as Joke);
    }, 3000);
  });;
  const joke = await timer as Joke;
  // ${joke.id}
  return redirect(`/jokes/new`);
}

export default function NewJokeRoute() {
  const actionData = useActionData<ActionData>();
  const transition = useTransition();
  console.log({transition})

  const getSubmitButtonText = (transitionState: Transition["state"]) => {
    switch(transitionState){
      case "submitting":
        return "Adding...";
      case "loading":
        return "Added!";
      default:
        return "Add";
    }
  }
  
  return (
    <div>
      <p>Add your own hilarious joke</p>
      <Form method="post">
      <fieldset disabled={transition.state === "submitting"}>
        <legend>share your own hilarious jokes!</legend>
        <div>
          <label>
            Name: <input 
              type="text" 
              name="name"
              defaultValue={actionData?.fields?.name}
              aria-required
              aria-invalid={Boolean(actionData?.fieldErrors?.name) || undefined}
              aria-describedby={
                actionData?.fieldErrors?.name
                  ? "name-error"
                  : undefined
              }
            />
          </label>
          {actionData?.fieldErrors?.name ? (
            <p
              className="form-validation-error"
              role="alert"
              id="name-error"
            >
              {actionData.fieldErrors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label>
            Content: <textarea 
              name="content"
              defaultValue={actionData?.fields?.content}
              aria-invalid={
                Boolean(actionData?.fieldErrors?.content) ||
                undefined
              }
              aria-describedby={
                actionData?.fieldErrors?.content
                  ? "content-error"
                  : undefined
              }
            />
          </label>
          {actionData?.fieldErrors?.content ? (
            <p
              className="form-validation-error"
              role="alert"
              id="content-error"
            >
              {actionData.fieldErrors.content}
            </p>
          ) : null}
        </div>
        <div>
          <button type="submit" className="button">
            {getSubmitButtonText(transition.state)}
          </button>
        </div>
        </fieldset>
      </Form>
    </div>
  );
}