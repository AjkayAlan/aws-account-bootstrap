import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { CostManagementStack } from '../stacks/cost-management-stack';
import { GitHubActionsCICDAccessStack } from '../stacks/github-actions-cicd-access-stack';

export interface ProdStageProps extends StageProps {
  cicdAccessRepos: string[];
  cicdAccessRoleName: string;
  budgetMonthlyUSDCost: number;
  budgetNotificationEmail: string;
}

export class ProdStage extends Stage {
  constructor(scope: Construct, id: string, props: ProdStageProps) {
    super(scope, id, props);

    new GitHubActionsCICDAccessStack(this, 'CICDAccessStack', {
      env: props.env,
      cicdAccessRepos: props.cicdAccessRepos,
      cicdAccessRoleName: props.cicdAccessRoleName,
    });
    new CostManagementStack(this, 'CostManagementStack', {
      env: props.env,
      budgetMonthlyUSDCost: props.budgetMonthlyUSDCost,
      budgetNotificationEmail: props.budgetNotificationEmail,
    });
  }
}
