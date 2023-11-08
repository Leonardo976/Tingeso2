#!/bin/bash

cd deployments-and-services/
kubectl delete services --all
kubectl delete pods --all
kubectl delete deployments --all

kubectl apply -f mysql-secrets.yml
kubectl apply -f mysql-dp-sv-pvc.yml
kubectl apply -f mysql-configmap.yml
kubectl apply -f config-deployment-service.yml
kubectl apply -f eureka-deployment-service.yml
kubectl apply -f fee-deployment-service.yml
kubectl apply -f student-deployment-service.yml
kubectl apply -f exam-deployment-service.yml
kubectl apply -f gateway-deployment-service.yml
kubectl apply -f frontend-deployment-service.yml

