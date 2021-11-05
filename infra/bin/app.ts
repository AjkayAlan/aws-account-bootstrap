#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ProdStage } from '../lib/stages/prod-stage';

export class App extends cdk.App {
  constructor() {
    super();

    new ProdStage(this, 'ProdStage');
  }
}

new App().synth();
