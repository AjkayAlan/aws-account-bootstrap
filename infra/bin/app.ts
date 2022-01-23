#!/usr/bin/env node

import 'source-map-support/register';

import { App } from 'aws-cdk-lib';

import { ProdStage } from '../lib/stages/prod-stage';

export class MyApp extends App {
  constructor() {
    super();

    new ProdStage(this, 'ProdStage', {
      repos: ['AjkayAlan/aws-account-bootstrap', 'AjkayAlan/alankay.net-v2'],
      cicdAccessRoleName: 'GitHubActionsCICDAccess',
      env: {
        account: '590668874907',
        region: 'us-east-1',
      },
    });
  }
}

new MyApp().synth();
