import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { SecretValue } from 'aws-cdk-lib';

export class MyPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('arunit9/my-pipeline', 'main',{
      // By default, looks for a secret named 'github-token'
      authentication: SecretValue.secretsManager('github-token'),
        }),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });
  }
}