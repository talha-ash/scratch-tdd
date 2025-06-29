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

### Usecase Folder
In use case folder we have service file which contain application logic as well as logic which need multiple domains.Also we follow vertical slice approach.So each usecase have its own service and interactor file which is glue between ui and user journey world and adpater to talk outside world(talk directly like api or through DI like third party service).Every file start with 'use' word is interactor which provide state, data and usecase trigger to consumer world which can be web app or mobile app or any other client.
Convention of file names inside particular usecase folder is to use  <UsecaseName>**.{ts, txs}.


### Domain Folder
Domain folder inside the context folder contain all the domain entities and their related business logic.
Total Independant of Outlayer in context of Onion, or hexagonal architecture.
It should not contain any dependencies on any framework or library.
It should only contain pure typescript code and business logic.

## Port Folder
Port folder inside the usecasse folder contain contract with things that are outside the application layer.
Contract should be according to application layer need and never otherwise.Outside things  can be api, third party service, state store,local storages etc.if things are simple and one to two properties reuqire or single api call then we can skip adapter and use directly in interactor and inject them to usecase, domain function and application logic function

