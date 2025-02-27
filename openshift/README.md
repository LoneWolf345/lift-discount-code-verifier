
# OpenShift Deployment Guide

## Prerequisites
- Access to OpenShift cluster with Tekton Pipelines 1.17.0
- Appropriate permissions to create resources in the project namespace

## Deployment Steps

1. Create the project if it doesn't exist:
```bash
oc new-project discount-code-verifier-uat
```

2. Apply the pipeline resources:
```bash
oc apply -f openshift/pipeline/pipeline-pvc.yaml
oc apply -f openshift/pipeline/pipeline.yaml
```

3. Start the pipeline:
```bash
oc create -f openshift/pipeline/pipeline-run.yaml
```

Alternatively, you can deploy the application manually:

1. Apply the deployment configuration:
```bash
oc apply -f openshift/deployment.yaml
oc apply -f openshift/service.yaml
oc apply -f openshift/route.yaml
oc apply -f openshift/network-policy.yaml
```

## Security Context

This application requires specific security context settings:
- UID Range: 1002290000-1002300000
- MCS Labels: s0:c48,c17
- Supplemental Groups: 1002290000/10000
- Security Context Constraint: nonroot-v2

## Environment Variables

Required environment variables:
- NODE_ENV: production
- PORT: 8080
- HOME: /opt/app-root/home

## Monitoring

The application includes health checks configured in the Deployment manifest:
- Liveness probe: HTTP GET / on port 8080
- Readiness probe: HTTP GET / on port 8080

## Resource Limits

Container resource limits:
- CPU Request: 200m
- CPU Limit: 500m
- Memory Request: 256Mi
- Memory Limit: 512Mi
