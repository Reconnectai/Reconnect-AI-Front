ARG  DOCKER_BASE_IMAGE=alpine:3.20.1
FROM ${DOCKER_BASE_IMAGE} AS base
RUN mkdir -p /usr/local/bin && ln -s /usr/local/bin ~
WORKDIR /usr/local/bin
ARG KIND_VERSION=v0.23.0
ARG KUBECTL_VERSION=v1.30.0
ARG HELMFILE_VER=0.166.0
RUN apk add --no-cache curl jq yq openssh-client git git-crypt xz rsync bash openssl make
RUN curl -s -L https://github.com/kubernetes-sigs/kind/releases/download/\${KIND_VERSION}/kind-linux-amd64 -o kind && chmod +x kind && \
    curl -s -L https://storage.googleapis.com/kubernetes-release/release/${KUBECTL_VERSION}/bin/linux/amd64/kubectl -o kubectl && chmod +x kubectl && \
    curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 && chmod 700 get_helm.sh && HELM_INSTALL_DIR=. ./get_helm.sh --no-sudo && rm get_helm.sh && \
    curl -fSL https://github.com/helmfile/helmfile/releases/download/v${HELMFILE_VER}/helmfile_${HELMFILE_VER}_linux_amd64.tar.gz | tar xvfz - helmfile  && \
    curl -s "https://raw.githubusercontent.com/kubernetes-sigs/kustomize/master/hack/install_kustomize.sh" | bash ; \
    helm plugin install https://github.com/databus23/helm-diff 1>/dev/null 2>&1
WORKDIR /
