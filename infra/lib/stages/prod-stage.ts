import { Construct, Stage, StageProps } from '@aws-cdk/core';
import { CICDAccessStack } from '../stacks/cicd-access-stack';

export class ProdStage extends Stage {
  constructor(scope: Construct, id: string, props: StageProps) {
    super(scope, id, props);

    new CICDAccessStack(this, 'CICDAccessStack', {
      env: props.env,
    });
  }
}
