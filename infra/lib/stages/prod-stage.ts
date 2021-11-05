import { Construct, Stage, StageProps } from '@aws-cdk/core';
import { GitHubActionsCICDAccessStack } from '../stacks/github-actions-cicd-access-stack';

export interface ProdStageProps extends StageProps {
  repos: string[];
}

export class ProdStage extends Stage {
  constructor(scope: Construct, id: string, props: ProdStageProps) {
    super(scope, id, props);

    new GitHubActionsCICDAccessStack(this, 'CICDAccessStack', {
      env: props.env,
      repos: props.repos,
    });
  }
}
