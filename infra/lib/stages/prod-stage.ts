import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { GitHubActionsCICDAccessStack } from '../stacks/github-actions-cicd-access-stack';

export interface ProdStageProps extends StageProps {
  repos: string[];
  cicdAccessRoleName: string;
}

export class ProdStage extends Stage {
  constructor(scope: Construct, id: string, props: ProdStageProps) {
    super(scope, id, props);

    new GitHubActionsCICDAccessStack(this, 'CICDAccessStack', {
      env: props.env,
      repos: props.repos,
      cicdAccessRoleName: props.cicdAccessRoleName,
    });
  }
}
