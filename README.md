# aws-account-bootstrap

All foundational things I need for my personal AWS account

## Using this repo with GitHub Actions

1. Set a [GitHub Action secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets) of `BUDGET_NOTIFICATION_EMAIL` to an email address you own. :warning: - This email address can still be leaked via the Actions artifacts, so make your repo Private (or let me know of a better way) if you are concerned!

2. Update the [app.ts](infra/bin/app.ts) and the [workflow](.github/workflows/build-and-deploy.yaml) to fit your environment. Replace the following items:

   - Your account id (replace `590668874907`)
   - Your region (replace `us-east-1`)
   - Your repos that need access (remember to include your bootstrap repo name such as `AjkayAlan/aws-account-bootstrap`!)
   - Your budget (if you want higher than 5 USD!)

3. Update the [IAM Role policy](infra/lib/stacks/github-actions-cicd-access-stack.ts) to fit your needs

4. Sign into the AWS CLI and bootstrap your AWS account and region by running `cdk bootstrap`.

5. Deploy the app manually so further GitHub actions access works as expected (you only need to do this once):

   ```sh
   cd infra
   cdk synth
   cdk deploy 'ProdStage/*'
   ```

After your stack deploys, the included github actions should work without issue for any subsequent updates.

## Allowing other repos to deploy to your account

Just add the repos to the list in the [app.ts](infra/bin/app.ts), and let the action run to deploy the update to your account.
