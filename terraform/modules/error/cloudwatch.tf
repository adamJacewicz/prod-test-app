resource "aws_cloudwatch_dashboard" "frd_error_dashboard" {
  dashboard_name = "Frontend_Error_Dashboard"

  dashboard_body = jsonencode({
    widgets = [
      {
        type : "metric",
        x : 0,
        y : 0,
        width : 24,
        height : 6,
        properties : {
          metrics : [
            [ "RMCatalogMetrics", "FrontendErrors" ]
          ],
          period : 300,
          stat : "Sum",
          region : "eu-central-1",
          title : "Sum of Frontend Errors"
        }
      }
      }
    ]
  })
}
