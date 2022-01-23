#
# Optionally include a .env to provide secrets and local config options.
#
-include .env

#
# Set some working variables
#
PWD := $(shell pwd)

#
# Ensure the local environment has the right binaries installed.
#
REQUIRED_BINS := docker docker-compose node npm yarn npx
$(foreach bin,$(REQUIRED_BINS),\
    $(if $(shell command -v $(bin) 2> /dev/null),,$(error Please install `$(bin)`)))

#
# Default is what happens if you only type make.
#

default: clean install start

#
# Bring in the external project dependencies.
#

install:
	docker run -it -v ${PWD}:/app "node:${NODE_VERSION}-alpine" /bin/sh -c 'cd /app; yarn install'

#
# Start the local development server.
#

start:
	@echo Bringing docker containers up
	docker-compose up -d
	docker-compose ps

down: stop
stop:
	docker-compose down --remove-orphans

restart: stop start

#
# Build stages: Setup and configure the application for the environment.
#

build:
	docker-compose exec node yarn build

lint:
	docker-compose exec node yarn lint

test:
	docker-compose exec node yarn test

format:
	docker-compose exec node yarn format

#
# Delete all non version controlled files to reset the project.
#

clean:
	rm -rf node_modules dist

#
# Connect to the command line within the container
#

cli:
	docker-compose exec node /bin/sh

#
# Run arbitary commands using the same image with:
#
# make run [command and args]
# e.g. make run ls -l
ifeq (run,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "run"
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(RUN_ARGS):;@:)
endif

.PHONY: run
run:
	docker run -it -v ${PWD}:/app "node:${NODE_VERSION}-alpine" /bin/sh -c "cd /app; $(RUN_ARGS)"


#
# Connect to the log output
#

log: logs
logs:
	docker-compose logs -f
