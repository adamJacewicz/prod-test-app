resource "aws_cloudwatch_dashboard" "frd_error_dashboard" {
  dashboard_name = "Frontend_Error_Dashboard"

  dashboard_body = jsonencode({
    widgets = [
      {
        type   = "metric"
        x      = 0
        y      = 0
        width  = 12
        height = 6

        properties = {
          metrics = [
            [
              "RMCatalogMetrics", "FrontendErrors"
            ]
          ]
          period = 86400 * 7
          stat   = "p95"
          view   = "singleValue"
          region = "eu-central-1"
          title  = "Frontend Errors Over Time"
        }
      },
      {
        type   = "metric"
        x      = 12
        y      = 0
        width  = 12
        height = 6

        properties = {
          metrics = [
            [
              "RMCatalogMetrics", "FrontendErrors"
            ]
          ]
          view    = "timeSeries"
          stacked = false,
          region  = "eu-central-1"
          title   = "Total Error Count (Last 10 Minutes)"
        }
      }
    ]
  })
}
