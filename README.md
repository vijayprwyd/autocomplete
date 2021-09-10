# Autocomplete Library

Please implement a React component that renders a text input field with autocompletion functionality and integrate it with a server endpoint to retrieve options.

## UI

This library exposes 3 main components :

1. `useAutocomplete` custom hook which is like a headless UI library that manages autocomplete state and accessibility agnostic of UI components. It returns props that takes care of accessibility, pop up state and the input value at the same time giving the flexibility to implement controlled components. This hook can be used by any component that wants to build an autocomplete UI but doesn't necessarily want to track internal state.

2. `Autocomplete`  which is a UI component on top of `useAutocomplete` hook written with Tailwind CSS. It takes care of rendering the components in UI , at the same time provding the flexibility to customize the components that are being rendered. This component can be directly used to render static options

3. `AutocompleteAsync` which is a UI component on top of `Autocomplete` that takes care of loading options asynchronously from a remote source providing some custom options like `debounceDuration` and returning loading and error states. This component can be used to render dynamic options that needs to be fetched from a server.


## The setup

## Server
A dummy server implementation to retrieve a list of countries:

```sh
$ cd server
$ yarn
$ yarn build
$ yarn start
```

This will give you a list of countries at this endpoint:
`https://localhost:3001?q={search query}`

The endpoint also accepts the query parameters `page`, `pageSize`, `latency`, and `monkey`, you can check `server/index.ts` for more details.

There is an OpenAPI spec for the endpoint in `server/api.yaml`. Some helpful types that have been generated from it can be found in `server/generatedApi.ts`.

## React app 

For the react app, we have configured eslint and prettier.

To run the app:

```sh
$ yarn
$ yarn dev
```

## Storybook

```sh
$ yarn storybook
```
