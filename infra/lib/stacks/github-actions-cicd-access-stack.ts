import {
  Effect,
  OpenIdConnectProvider,
  PolicyDocument,
  PolicyStatement,
  Role,
  WebIdentityPrincipal,
} from '@aws-cdk/aws-iam';
import * as cdk from '@aws-cdk/core';

export interface GitHubActionsCICDAccessStageProps extends cdk.StackProps {
  repos: string[];
  cicdAccessRoleName: string;
}

export class GitHubActionsCICDAccessStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: GitHubActionsCICDAccessStageProps) {
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
        'ForAnyValue:StringLike': {
          [`${domain}:sub`]: props.repos.map((repo) => `repo:${repo}:*`),
        },
      }),
      inlinePolicies: {
        'cicd-access': new PolicyDocument({
          statements: [
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
            new PolicyStatement({
              actions: ['s3:*'],
              resources: ['arn:aws:s3:::cdktoolkit-stagingbucket-*'],
              effect: Effect.ALLOW,
            }),
          ],
        }),
      },
    });
  }
}
