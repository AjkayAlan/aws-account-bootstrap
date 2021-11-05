#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ProdStage } from '../lib/stages/prod-stage';

export class App extends cdk.App {
  constructor() {
    super();

    new ProdStage(this, 'ProdStage', {
      repos: ['AjkayAlan/aws-account-bootstrap'],
      env: {
        account: '590668874907',
        region: 'us-east-1',
      },
    });
  }
}

new App().synth();
