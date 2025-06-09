# Scratch Recipe App 

A simple recipe app built with React, TypeScript, and Tailwind CSS. Following Tdd Approach.


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


