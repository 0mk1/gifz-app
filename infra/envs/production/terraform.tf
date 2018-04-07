terraform {
  required_version = "~> 0.10"

  backend "s3" {
    region = "us-east-1"
    bucket = "terraform-gifz-app"
    key = "production/terraform.tfstate"
    encrypt = true
  }
}

variable domain {}
variable region {}
variable cloudflare_email {}
variable cloudflare_domain {}
variable cloudflare_token {}

provider "cloudflare" {
  email = "${var.cloudflare_email}"
  token = "${var.cloudflare_token}"
}

provider "aws" {
  region = "${var.region}"
}

module "gifz-app" {
  source = "../../modules/frontend"

  region = "${var.region}"
  domain = "${var.domain}"
  cloudflare_domain = "${var.cloudflare_domain}"
}

output "cloudfront_domain_name" {
  value = "${module.gifz-app.cloudfront_domain_name}"
}
