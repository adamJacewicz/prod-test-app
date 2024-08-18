resource "aws_api_gateway_method" "error_tracking_api_post_method" {
  rest_api_id   = aws_api_gateway_rest_api.error_tracking_api.id
  resource_id   = aws_api_gateway_resource.track_error.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_method_settings" "error_tracking_api_post_method_settings" {
  rest_api_id = aws_api_gateway_rest_api.error_tracking_api.id
  stage_name  = aws_api_gateway_stage.prod_stage.stage_name
  method_path = "*/*"

  settings {
    metrics_enabled = true
    logging_level   = "INFO"
  }
}

resource "aws_api_gateway_integration" "error_tracking_lambda_integration" {
  rest_api_id = aws_api_gateway_rest_api.error_tracking_api.id
  resource_id = aws_api_gateway_resource.track_error.id
  http_method = aws_api_gateway_method.error_tracking_api_post_method.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.error_handler.invoke_arn
}
