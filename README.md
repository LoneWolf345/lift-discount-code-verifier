
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/697be092-4603-4d66-a348-5098640004d6

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/697be092-4603-4d66-a348-5098640004d6) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Standard Web Deployment

Simply open [Lovable](https://lovable.dev/projects/697be092-4603-4d66-a348-5098640004d6) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

## OpenShift Deployment

### Prerequisites
- Access to OpenShift cluster with Tekton Pipelines 1.17.0
- Appropriate permissions to create resources in the project namespace
- OpenShift CLI (oc) installed

### Repository
The project repository is available at: https://github.com/LoneWolf345/lift-discount-code-verifier

### Deployment Methods

#### Method 1: Using OpenShift Pipelines (Recommended)
1. Create the project:
   ```bash
   oc new-project discount-code-verifier-uat
   ```
2. Apply pipeline resources:
   ```bash
   oc apply -f openshift/pipeline/pipeline-pvc.yaml
   oc apply -f openshift/pipeline/pipeline.yaml
   ```
3. Start pipeline:
   ```bash
   oc create -f openshift/pipeline/pipeline-run.yaml
   ```

#### Method 2: Manual Deployment
Apply configurations directly:
```bash
oc apply -f openshift/deployment.yaml
oc apply -f openshift/service.yaml
oc apply -f openshift/route.yaml
oc apply -f openshift/network-policy.yaml
```

### Critical Environment Variables
The following environment variables must be configured in your deployment:
```yaml
- name: NODE_ENV
  value: production
- name: PORT
  value: "8080"
- name: HOME
  value: /opt/app-root/home
- name: NPM_CONFIG_CACHE
  value: /opt/app-root/home/.npm
- name: NODE_OPTIONS
  value: "--max-old-space-size=384"
- name: NPM_RUN
  value: build
```

### Security Context Requirements
- UID Range: 1002290000-1002300000
- MCS Labels: s0:c48,c17
- Supplemental Groups: 1002290000/10000
- Security Context Constraint: nonroot-v2

### Resource Limits
Container resource limits:
- CPU Request: 200m
- CPU Limit: 500m
- Memory Request: 256Mi
- Memory Limit: 512Mi

### Health Checks
The application includes:
- Liveness probe: HTTP GET / on port 8080
- Readiness probe: HTTP GET / on port 8080

### Troubleshooting
Common issues and solutions:
1. If the pod fails to start, verify environment variables are properly set
2. Check security context constraints are properly applied
3. Ensure resource limits are appropriate for your environment
4. Verify pipeline permissions if using Method 1

For detailed deployment configuration, refer to the files in the `openshift/` directory.
