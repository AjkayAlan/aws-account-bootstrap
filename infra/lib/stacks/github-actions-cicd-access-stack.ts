import { Stack, StackProps } from 'aws-cdk-lib';
import {
  Effect,
  OpenIdConnectProvider,
  PolicyDocument,
  PolicyStatement,
  Role,
  WebIdentityPrincipal,
} from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface GitHubActionsCICDAccessStageProps extends StackProps {
  repos: string[];
  cicdAccessRoleName: string;
}

export class GitHubActionsCICDAccessStack extends Stack {
  constructor(scope: Construct, id: string, props: GitHubActionsCICDAccessStageProps) {
    super(scope, id, props);

    const domain = 'token.actions.githubusercontent.com';

    const ghToAWSOIDC = new OpenIdConnectProvider(this, 'GitHubToAWSOIDCProvider', {
      url: `https://${domain}`,
      clientIds: ['sts.amazonaws.com'],
      thumbprints: ['6938fd4d98bab03faadb97b34396831e3780aea1'],
    });

    new Role(this, 'GitHubActionsCICDAccessRole', {
      roleName: props.cicdAccessRoleName,
      assumedBy: new WebIdentityPrincipal(ghToAWSOIDC.openIdConnectProviderArn, {
        'ForAllValues:StringLike': {
          [`${domain}:sub`]: props.repos.map((repo) => `repo:${repo}:*`),
          [`${domain}:aud`]: 'sts.amazonaws.com',
        },
      }),
      inlinePolicies: {
        'cicd-access': new PolicyDocument({
          statements: [
            // Useful for bootstrapping and CDK v1
            new PolicyStatement({
              actions: ['cloudformation:*'],
              resources: ['*'],
              effect: Effect.ALLOW,
            }),
            new PolicyStatement({
              actions: ['*'],
              resources: ['*'],
              effect: Effect.ALLOW,
              conditions: {
                'ForAnyValue:StringEquals': {
                  'aws:CalledVia': ['cloudformation.amazonaws.com'],
                },
              },
            }),
            // CDK v1
            new PolicyStatement({
              actions: ['s3:*'],
              resources: ['arn:aws:s3:::cdktoolkit-stagingbucket-*'],
              effect: Effect.ALLOW,
            }),
            // CDK v2
            new PolicyStatement({
              actions: ['sts:AssumeRole'],
              resources: ['arn:aws:iam::*:role/cdk-*'],
              effect: Effect.ALLOW,
            }),
          ],
        }),
      },
    });
  }
}
