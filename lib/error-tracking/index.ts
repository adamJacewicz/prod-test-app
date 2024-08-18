import {
  CloudWatchClient,
  PutMetricDataCommand,
  PutMetricDataCommandInput,
} from '@aws-sdk/client-cloudwatch';
import { Handler } from 'aws-lambda';

interface EventInput {
  body: string;
}

interface LambdaResponse {
  headers: { [key: string]: string };
  statusCode: number;
  body: string;
}

const cloudWatchClient = new CloudWatchClient({ region: 'eu-central-1' });

export const trackError: Handler<EventInput, LambdaResponse> = async (event) => {
  const { value } = JSON.parse(event.body);

  if (value == undefined) {
    return buildResponse(400, `Missing loadTimeMs in body.`);
  }

  const params: PutMetricDataCommandInput = {
    MetricData: [
      {
        MetricName: 'FrontendErrors',
        Unit: 'Count',
        Value: value,
      },
    ],
    Namespace: 'RMCatalogMetrics',
  };

  const command = new PutMetricDataCommand(params);
  await cloudWatchClient.send(command);
  return buildResponse(200, `Metric sent successfully.`);
};

function buildResponse(statusCode: number, body: string): LambdaResponse {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode,
    body,
  };
}
