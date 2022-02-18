import { Stack, StackProps } from 'aws-cdk-lib';
import { CfnBudget } from 'aws-cdk-lib/aws-budgets';
import { Construct } from 'constructs';

export interface CostManagementStackProps extends StackProps {
  budgetMonthlyUSDCost: number;
  budgetNotificationEmail: string;
}

export class CostManagementStack extends Stack {
  constructor(scope: Construct, id: string, props: CostManagementStackProps) {
    super(scope, id, props);

    new CfnBudget(this, 'MonthlyCostBudget', {
      budget: {
        budgetType: 'COST',
        timeUnit: 'MONTHLY',
        budgetLimit: {
          amount: props.budgetMonthlyUSDCost,
          unit: 'USD',
        },
      },

      // When forecasted or actual cost exceeds the budget, notify
      notificationsWithSubscribers: [
        {
          notification: {
            comparisonOperator: 'GREATER_THAN',
            notificationType: 'ACTUAL',
            thresholdType: 'PERCENTAGE',
            threshold: 100,
          },
          subscribers: [
            {
              address: props.budgetNotificationEmail,
              subscriptionType: 'EMAIL',
            },
          ],
        },
        {
          notification: {
            comparisonOperator: 'GREATER_THAN',
            notificationType: 'FORECASTED',
            thresholdType: 'PERCENTAGE',
            threshold: 100,
          },
          subscribers: [
            {
              address: props.budgetNotificationEmail,
              subscriptionType: 'EMAIL',
            },
          ],
        },
      ],
    });
  }
}
