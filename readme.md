# AWS Amplify with Yarn Workspaces

Use workspace packages and import into Lambdas.

## Benefits

- separate app and business logic from backend
- write ESM and transpile to CJS for use in Lambdas

## Caveats

- changes to packages do not trigger a resource update status for Amplify to redeploy functions using latest package updates, requires manual updates to Lambda's `package.json` to use latest package version

## Pushing Changes from Local

`yarn push` to execute [bash script](./scripts/push). This script does the following:

- starts [Verdaccio](https://verdaccio.org/) to host ephemeral npm registry
  - this is required for installing workspace packages without allowing `yarn workspaces` to install by symlinking
- publishes each package with scope `@my` to Verdaccio (customize by changing package name scopes and adjusting the [.npmrc](./.npmrc))
- executes `amplify push -y`
  - Amplify CLI will install function dependencies on push before packaging. If the package falls under the defined package scope, `@my`, dependency will be installed from Verdaccio layer
- kill Verdaccio layer and remove ephemeral storage
