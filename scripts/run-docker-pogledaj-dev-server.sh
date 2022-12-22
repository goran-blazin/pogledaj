export CR_PAT=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
echo $CR_PAT | docker login ghcr.io -u creepy00 --password-stdin

docker run -d --restart unless-stopped \
  --name watchtower \
  -e REPO_USER=goranblazin \
  -e REPO_PASS=dckr_pat_Fu6mPSYuB-UySI6OAuLOCtL7CSw \
  -v /var/run/docker.sock:/var/run/docker.sock \
  containrrr/watchtower --debug -i 300 --cleanup

docker run -d -p 8080:80 --restart unless-stopped \
        --name pogledaj-web ghcr.io/creepy00/pogledaj/pogledaj-web:latest

docker run -d -p 8081:8080 --restart unless-stopped \
        --name pogledaj-api ghcr.io/creepy00/pogledaj/pogledaj-api:latest