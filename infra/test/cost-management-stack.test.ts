import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import { CostManagementStack } from '../lib/stacks/cost-management-stack';

describe('CostManagementStack', () => {
  test('snapshot', () => {
    const app = new App();
    const stack = new CostManagementStack(app, 'CostManagementStack', {
      budgetMonthlyUSDCost: 5,
      budgetNotificationEmail: 'budget@example.com',
    });

    expect(Template.fromStack(stack).toJSON()).toMatchSnapshot();
  });
});
