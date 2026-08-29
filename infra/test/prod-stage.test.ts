import { App } from 'aws-cdk-lib';

import { ProdStage } from '../lib/stages/prod-stage';

describe('ProdStage', () => {
  test('snapshot', () => {
    const app = new App();
    new ProdStage(app, 'ProdStage', {
      cicdAccessRepos: ['AjkayAlan/aws-account-bootstrap', 'AjkayAlan/alankay.net-v2'],
      cicdAccessRoleName: 'GitHubActionsCICDAccess',
      budgetMonthlyUSDCost: 5,
      budgetNotificationEmail: 'budget@example.com',
      env: {
        account: '590668874907',
        region: 'us-east-1',
      },
    });

    const assembly = app.synth();
    const stackByName = (name: string) => assembly.stacksRecursively.find((s) => s.stackName === name)!;

    expect(stackByName('ProdStage-CICDAccessStack').template).toMatchSnapshot('ProdStage-CICDAccessStack');
    expect(stackByName('ProdStage-CostManagementStack').template).toMatchSnapshot('ProdStage-CostManagementStack');
  });
});
