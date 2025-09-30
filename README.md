# Scratch Web App

A simple app built with React, TypeScript, and Tailwind CSS. Practicing TDD, Integration Testing, CI With github action, Pnpm Workspace (handling & Resource Sharing).

## Folder Structure

### Routes

Routes folder only contain routes

### Components

Components folder contains all the generic atomic reusable components

### Shared

Shared folder work as shared kernal.No framework specific code should be there.
It should contain pure typescipt code and plateform specific Api
It contain e.g(types, utils, common stuff among domain or bounded context, plateform specific Api Wrapper)

### Context

Context Folder contain context(auth, feed etc).Each context contain Domain folder( contain all entites. Entity and its related business logic(pure typescript code no dependencies).Single file per entity contain entity and its related business logic), Usercase folder(Each Folder contain ui, application business logic service, adapters, interactor(glue between ui and user journey world), repos contain data and state via external store or react query), components etc

## Points

### Point 1
We have tsconfig for node and browser. we do this to have separate config for our source file and config file like vite.config.ts
we have these file in root folder as well as in each package and apps. so most of the config are reused.
we have to include config file in tsconfig.node.json and also in eslint.config.mjs so config file we also lint and typecheck
Below is an example of how to configure tsconfig.json for node and browser in eslint
May be somethings are redundant.Todo need to clean up

```js
// ESLint sees: eslint.config.mjs
// Recognized as: Pure ES module (never matches TypeScript patterns)
// Parsed with: Default JavaScript parser
{
    files: ['*.config.ts', 'vite.config.ts', 'cypress/**/*.ts'],
    languageOptions: {
        globals: {
            ...globals.node,
        },
        parserOptions: {
            project: ['./tsconfig.node.json'],//need to specify this to tell eslint where to find tsconfigs when parse these files
            tsconfigRootDir: import.meta.dirname,
        },
    },
},
```

### Point 2
Assuming your include/exclude patterns are exclusive (every file in your project is either handled by tsconfig.test.json or tsconfig.app.json, not both) then VSCode should understand the appropriate options to apply depending on what file you have open. I'm not sure what would happen if they overlap.

EDIT: You'd also want tsconfig.test.json to have a reference to ./tsconfig.app.json so that you can import your app code into your tests (rather than having those files included directly). See https://www.typescriptlang.org/docs/handbook/project-references.html for more info about project references.  
Don't use -b in tsc because we use separate tsconfig for editor, build, test