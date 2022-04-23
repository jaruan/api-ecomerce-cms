ENV?=development

docker-compose-run:
	docker-compose -f docker/docker-compose.yml up
.PHONY: docker-compose-run

docker-compose-stop:
	docker-compose -f docker/docker-compose.yml down
.PHONY: docker-compose-stop

init-environment:
	cp environments/${ENV}.env .env
.PHONY:init-environment

init-data: init-environment
	node db/cache/index.js
.PHONY: init-data
