export CR_PAT=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
echo $CR_PAT | docker login ghcr.io -u goran-blazin --password-stdin

docker run -d --restart unless-stopped \
  --name watchtower \
  -e REPO_USER=goran-blazin \
  -e REPO_PASS=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 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  containrrr/watchtower --debug -i 300 --cleanup

docker run -d -p 8080:80 --restart unless-stopped \
        --name pogledaj-web ghcr.io/goran-blazin/pogledaj/pogledaj-web:latest

docker run -d -p 8081:8080 --restart unless-stopped \
        --name pogledaj-api ghcr.io/goran-blazin/pogledaj/pogledaj-api:latest