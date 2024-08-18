resource "aws_api_gateway_rest_api" "error_tracking_api" {
  name        = "ErrorTrackingAPI"
  description = "API for tracking frontend errors"
}

resource "aws_api_gateway_resource" "track_error" {
  rest_api_id = aws_api_gateway_rest_api.error_tracking_api.id
  parent_id   = aws_api_gateway_rest_api.error_tracking_api.root_resource_id
  path_part   = "track-error"
}


resource "aws_lambda_permission" "error_tracking_api_gateway" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.error_handler.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.error_tracking_api.execution_arn}/*/*/*"
}

resource "aws_api_gateway_deployment" "error_tracking_api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.error_tracking_api.id

  depends_on = [
    aws_api_gateway_method.error_tracking_api_post_method,
    aws_api_gateway_integration.error_tracking_lambda_integration
  ]

  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.error_tracking_api.body))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_cloudwatch_log_group" "error_tracking_api_prod_log" {
  name              = "/aws/api-gateway/${aws_api_gateway_rest_api.error_tracking_api.id}"
  retention_in_days = 7
}

resource "aws_api_gateway_stage" "prod_stage" {
  deployment_id = aws_api_gateway_deployment.error_tracking_api_deployment.id
  rest_api_id   = aws_api_gateway_rest_api.error_tracking_api.id
  stage_name    = "prod"

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.error_tracking_api_prod_log.arn
    format          = file("${path.module}/access_log_format.json")
  }
}
