# Gitops ArgoCD

                 ┌───────────────────────┐
                 │  GitHub Actions (CI)  │
                 │  build & push images  │
                 └──────────┬────────────┘
                            │ commits new image tag
                            ▼
                 ┌───────────────────────┐
                 │  GitOps repo (YAMLs)  │
                 └──────────┬────────────┘
                            │ watched by ArgoCD
                            ▼
                 ┌───────────────────────┐
                 │   ArgoCD in cluster   │
                 └──────────┬────────────┘
                            │ applies manifests
                            ▼
                 ┌───────────────────────┐
                 │  Kubernetes Cluster   │
                 └───────────────────────┘

```bash
  docker build -t andriizilnyk/backend-app:latest ./project/backend-app
  docker build -t andriizilnyk/frontend-app:latest ./project/frontend-app
  
  docker tag andriizilnyk/backend-app:latest andriizilnyk/backend-app:v1.0.0
  docker tag andriizilnyk/frontend-app:latest andriizilnyk/frontend-app:v1.0.0
  
  docker push andriizilnyk/backend-app:latest
  docker push andriizilnyk/backend-app:v1.0.0
  
  docker push andriizilnyk/frontend-app:latest
  docker push andriizilnyk/frontend-app:v1.0.0
```

```bash
  docker run -d \
  --name backend-app \
  -p 4000:4000 \
  -e NODE_ENV=production \
  -e PORT=4000 \
  andriizilnyk/backend-app:latest
```

```bash
  docker run -d \
  --name frontend-app \
  -p 3000:80 \
  andriizilnyk/frontend-app:latest
```

### Argo CD

```bash
  kubectl create namespace argocd
  
  kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
  
  brew install argocd
  
  kubectl port-forward svc/argocd-server -n argocd 8080:443
  
  kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d && echo
```

```bash
  kubectl apply -f project/backend-app/k8s/deployment.yaml
  kubectl apply -f project/backend-app/k8s/service.yaml
  kubectl apply -f project/frontend-app/k8s/deployment.yaml
  kubectl apply -f project/frontend-app/k8s/service.yaml
  
  kubectl apply -f gitops/apps/backend-app.yaml
  kubectl apply -f gitops/apps/frontend-app.yaml
  kubectl apply -f gitops/root-app.yaml
```
