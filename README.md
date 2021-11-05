# aws-account-bootstrap

All foundational things I need for my personal AWS account

## Using this repo with GitHub Actions

1. Update the [app.ts](infra/bin/app.ts) and the [workflow](.github/workflows/build-and-deploy.yaml) to fit your environment. Replace the following items:

   - Your account id (replace `590668874907`)
   - Your region (replace `us-east-1`)
   - Your repos that need access (remember to include your bootstrap repo name such as `AjkayAlan/aws-account-bootstrap`!)

2. Update the [IAM Role policy](infra/lib/stacks/github-actions-cicd-access-stack.ts) to fit your needs

3. Sign into the AWS CLI and bootstrap your AWS account and region by running `cdk bootstrap`.

4. Deploy the app manually so further GitHub actions access works as expected (you only need to do this once):

   ```sh
   cd infra
   cdk synth
   cdk deploy 'ProdStage/*'
   ```

After your stack deploys, the included github actions should work without issue.

## Allowing other repos to deploy to your account

Just add the repos to the list in the [app.ts](infra/bin/app.ts), and let the action run to deploy the update to your account.
