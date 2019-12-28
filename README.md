# BlockOneApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

## What's New

The App.

## Notes

Thank you for the opportunity to build this app.
The two most significant issues I ran into were:
  1. Using an api that returned the EOS blockchain data in a stable, consistent manner.
  2. Understanding the data structure of some of the EOS blockchain objects. Specifically, the transactions array object contained a trx object which contained more transactions which contained accounts. So, there were transactions which contained trxs which contained more transactions which contained the ricardian contracts text. 
  
  Since each transaction had multiple ricardian contracts, I wasn't sure how best to display all them, so I simply displayed the first one contained in the transaction.
  
  Typically, if I was in a development and production environment, I would seek input from individuals in the organization who either developed the data structure or someone with more knowledge about using the specific data structure, so that I could ask about the intended use and UI expectation. I'm not shy about asking questions, however, I didn't do that here only because I thought that was out of scope of the intention of this project. 

## Testing

I deployed this app to Zeit so that it can be tested in a pseudo-production environment. 

It can be found here.
<URL>

There are also instructions below to run this on a local dev server and instructions below to run the unit tests. No e2e tests were required for this project.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

