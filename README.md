# React-Advertisy:

## Screenshot

![](/src/Assets/example-screenshot.png?raw=true "Screenshot")

## How to run:

**First step:**

```bash
  npm i
```

**Running app locally:**

```bash
  npm run start
```

Browse to https://localhost:3000

**Running tests locally:**

```bash
  npm run test
```

## Comments:

- Used Typescript instead of javascript as it provides a robust type system which can detect many issues at build time rather than at runtime.

- Used prettier as the default ts/tsx formatter.

  ~~- It's extremely opinionated but at least it enforces a strict style for all the code although I do believe the 80 character max width limit is a bit too strict.~~

- Configured webpack manually due to personal preference. Since I am in charge of how the app is bundled transpiled I know every step of the process.

  - create-react-app removes too much from the developer in my personal opinion.

- Structured the application as how I would structure a production app.

  - I use redux and redux-sagas to act as a data plane for the app.

    - Having a separate data and UI plane allows the app to be extremely scalable.

    - Follows best practices from the industry and takes the best ideas from other programming areas

      - Sagas acts a a orchestrator (thin imperative shell) that calls pure functions (services).

        - This follows the Clean Architecture model to an extent

  ~~- I am a big fan of presentational and container components.~~

  ~~- I know this can be achieved with hooks but with sagas middleware it's easier to compose complex logic both sync and async.~~

  - I can give examples where this paradigm was extremely pivotal to deliver top quality features in a timely manner.

## Potential Improvements:

~~- Currently Typescript is in charge of transpiling down to es5 syntax.~~

~~- This misses out on potential better optimizations present in the babel ecosystem such as bundle size and tree shaking.~~

    ~~- The solution would be just to transpile down to esnext and have a extra stage in webpack to use babel to optimize and tree shake the final produced javascript.~~

- Add more tests

  - Due to time constraints I only wrote tests for services (pure functions)

  - Cypress can be added to test UI elements
