# Custom project from start.vaadin.com

This project was created from https://start.vaadin.com. It's a fully working Vaadin application that you continue developing locally.
It has all the necessary dependencies and files to help you get going.

The project is a standard Maven project, so you can import it to your IDE of choice. You'll need to have Java 8+ and Node.js 10+ installed.

To run from the command line, use `mvn` and open [http://localhost:8080](http://localhost:8080) in your browser.

## This application is demoing various aspects of Hilla framework

The application is not complete. It will start, but shows no data. There are lot of missing things.
The missing things are marked in comments as TODO:. There are TODO's throught the application both in
the Java classes, and TypeScript files. Your task is to fill missing pieces. 

Hilla documentation is found at https://hilla.dev/

Reference solutions (and some more things) can be found at

httsp://github.com/TatuLund/hilla-demo/

## Before running

Create file "config/secrets/application.properties"

use this command to generate new random secret for your app:

openssl rand -base64 32

Copy the <secret key> to property in application.properties file

com.example.application.app.secret=<secret key>

## Running the app

Use:

mvn spring-boot:run

## Project structure

| Directory                                  | Description                                                                                                                 |
| :----------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `frontend/`                                | Client-side source directory                                                                                                |
| &nbsp;&nbsp;&nbsp;&nbsp;`index.html`       | HTML template                                                                                                               |
| &nbsp;&nbsp;&nbsp;&nbsp;`index.ts`         | Frontend entrypoint, contains the client-side routing setup using [Vaadin Router](https://vaadin.com/router)                |
| &nbsp;&nbsp;&nbsp;&nbsp;`main-layout.ts`   | Main layout Web Component, contains the navigation menu, uses [App Layout](https://vaadin.com/components/vaadin-app-layout) |
| &nbsp;&nbsp;&nbsp;&nbsp;`views/`           | UI views Web Components (TypeScript)                                                                                        |
| &nbsp;&nbsp;&nbsp;&nbsp;`styles/`          | Styles directory (CSS)                                                                                                      |
| `src/main/java/<groupId>/`                 | Server-side source directory, contains the server-side Java views                                                           |
| &nbsp;&nbsp;&nbsp;&nbsp;`Application.java` | Server entrypoint                                                                                                           |

## What next?

[vaadin.com](https://vaadin.com) has lots of material to help you get you started:

- Read the [Quick Start Guide](https://vaadin.com/docs/v16/flow/typescript/quick-start-guide.html) to learn the first steps of full stack Vaadin applications development.
- Follow the tutorials in [vaadin.com/learn/tutorials](https://vaadin.com/learn/tutorials). Especially [Building Modern Web Apps with Spring Boot and Vaadin](https://vaadin.com/learn/tutorials/modern-web-apps-with-spring-boot-and-vaadin) is good for getting a grasp of the basic Vaadin concepts.
- Read the documentation in [vaadin.com/docs](https://vaadin.com/docs).
- For a bigger Vaadin application example, check out the Full Stack App starter from [vaadin.com/start](https://vaadin.com/start).
