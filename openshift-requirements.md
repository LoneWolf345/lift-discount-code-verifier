
# OpenShift Deployment Requirements Template

## 1. Security Context Constraints (SCC)
- [ ] Allowed UID range: ________________
- [ ] Allowed GID range: ________________
- [ ] Is UID 1001 acceptable? Yes/No: ____
- [ ] Required fsGroup: ________________
- [ ] Additional SCC policies: ________________

## 2. Resource Requirements
### Container Resources
- [ ] Memory request: ________________
- [ ] Memory limit: ________________
- [ ] CPU request: ________________
- [ ] CPU limit: ________________
- [ ] Storage requirements: ________________
- [ ] Maximum pods per node: ________________

## 3. Networking Configuration
- [ ] Internal DNS configuration: ________________
- [ ] Required route hostname: ________________
- [ ] TLS termination type: ________________
- [ ] Load balancer requirements: ________________
- [ ] Network policies: ________________
- [ ] Required port ranges: ________________

## 4. Storage Configuration
- [ ] Available storage classes: ________________
- [ ] Persistent volume requirements: ________________
- [ ] Backup requirements: ________________
- [ ] Data retention policy: ________________

## 5. Container Registry
- [ ] Internal registry URL: ________________
- [ ] Pull secret name: ________________
- [ ] Image retention policy: ________________
- [ ] Registry access credentials required? Yes/No: ____

## 6. Environment Configuration
- [ ] Required environment variables:
  ```
  Variable Name | Value | Secret? (Y/N)
  --------------|-------|---------------
                |       |
  ```
- [ ] ConfigMap requirements:
  ```
  ConfigMap Name | Key | Value
  --------------|-----|-------
                |     |
  ```

## 7. Monitoring and Health Checks
- [ ] Monitoring solution: ________________
- [ ] Required health check endpoints: ________________
- [ ] Metrics collection requirements: ________________
- [ ] Log aggregation system: ________________
- [ ] Required health check frequency: ________________

## 8. Compliance Requirements
- [ ] Security scanning tools: ________________
- [ ] Required certifications: ________________
- [ ] Audit logging requirements: ________________
- [ ] Container signing requirements: ________________

## 9. Cluster Information
- [ ] OpenShift version: ________________
- [ ] Kubernetes version: ________________
- [ ] Available node selectors: ________________
- [ ] Node taints/tolerations: ________________
- [ ] Cluster-specific limitations: ________________

## 10. Build and Deployment
- [ ] Preferred CI/CD tools: ________________
- [ ] Source repository access: ________________
- [ ] Deployment strategy (Rolling/Blue-Green): ________________
- [ ] Build strategy requirements: ________________
- [ ] Required build resources: ________________

## Additional Notes
Please provide any additional requirements or considerations specific to your OpenShift environment:

```
Notes:




```

## Contact Information
- Primary Contact: ________________
- Role: ________________
- Email: ________________
- Emergency Contact: ________________

