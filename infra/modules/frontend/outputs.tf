output "cloudfront_domain_name" {
  value = "${aws_cloudfront_distribution.default.domain_name}"
}

output "cloudfront_status" {
  value = "${aws_cloudfront_distribution.default.status}"
}
