import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import { GitHubActionsCICDAccessStack } from '../lib/stacks/github-actions-cicd-access-stack';

describe('GitHubActionsCICDAccessStack', () => {
  test('snapshot', () => {
    const app = new App();
    const stack = new GitHubActionsCICDAccessStack(app, 'CICDAccessStack', {
      cicdAccessRepos: ['AjkayAlan/aws-account-bootstrap'],
      cicdAccessRoleName: 'GitHubActionsCICDAccess',
    });

    expect(Template.fromStack(stack).toJSON()).toMatchSnapshot();
  });
});
