# aws-account-bootstrap

All foundational things I need for my personal AWS account

## Using this repo with GitHub Actions

Update this project with the following changes to fit your environment:

1. Your account id (replace `590668874907`)
2. Your region (replace `us-east-1`)
3. Your bootstrap repo name (replace `AjkayAlan/aws-account-bootstrap`)

Then sign into the AWS CLI and bootstrap your AWS account by running `cdk bootstrap`.

Then deploy the app manually so further GitHub actions access works as expected (you only need to do this once)

After your stack deploys, the included github actions should work without issue.
