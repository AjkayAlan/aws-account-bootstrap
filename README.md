# aws-account-bootstrap

All foundational things I need for my personal AWS account

## Using this repo with GitHub Actions

Update the [app.ts](infra/bin/app.ts) and the [workflow](.github/workflows/build-and-deploy.yaml) to fit your environment:

1. Your account id (replace `590668874907`)
2. Your region (replace `us-east-1`)
3. Your bootstrap repo name (replace `AjkayAlan/aws-account-bootstrap`)

Update the [IAM Role policy](infra/lib/stacks/github-actions-cicd-access-stack.ts) to fit your needs

Then sign into the AWS CLI and bootstrap your AWS account by running `cdk bootstrap`.

Then deploy the app manually so further GitHub actions access works as expected (you only need to do this once)

After your stack deploys, the included github actions should work without issue.
