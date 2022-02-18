#!/usr/bin/env node

import 'source-map-support/register';

import { App } from 'aws-cdk-lib';

import { ProdStage } from '../lib/stages/prod-stage';

export class MyApp extends App {
  constructor() {
    super();

    new ProdStage(this, 'ProdStage', {
      cicdAccessRepos: ['AjkayAlan/aws-account-bootstrap', 'AjkayAlan/alankay.net-v2'],
      cicdAccessRoleName: 'GitHubActionsCICDAccess',
      budgetMonthlyUSDCost: 5,
      budgetNotificationEmail: process.env.BUDGET_NOTIFICATION_EMAIL || 'name@example.com',
      env: {
        account: '590668874907',
        region: 'us-east-1',
      },
    });
  }
}

new MyApp().synth();
