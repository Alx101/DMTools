MAKEFILE := $(abspath $(lastword $(MAKEFILE_LIST)))

ROOT_DIR ?= $(patsubst %/,%,$(dir $(MAKEFILE)))
SRC_DIR := $(ROOT_DIR)/src

HOST_ROOT_DIR ?= $(ROOT_DIR)
HOST_SRC_DIR := $(HOST_ROOT_DIR)/$(notdir $(SRC_DIR))

DOCKER_SERVICE ?= dmtools


.PHONY: build
build:
	docker-compose build $(DOCKER_SERVICE);

.PHONY: bash
bash:
	@docker-compose run --rm --workdir=/app --entrypoint=bash $(DOCKER_SERVICE) || true


.PHONY: start
start:
	@cd $(ROOT_DIR); \
	npm run start


.PHONY: install-packages
install-packages:
	@cd $(ROOT_DIR); \
	npm install

.PHONY: update-packages
update-packages:
	@cd $(ROOT_DIR); \
	npm update



########################################################################################
#
#   TESTS
#
########################################################################################

.PHONY: test
test:
	cd $(ROOT_DIR) && \
	npm run test

.PHONY: coverage
coverage:
	cd $(ROOT_DIR) && \
	npm run coverage

.PHONY: lint
lint:
	cd $(ROOT_DIR) && \
	npm run lint

########################################################################################
#
#   DOCKER WRAPPER
#
########################################################################################

#| docker-compose proxy function running this Makefile within
#| a service container with given target, args and options.
#|
#| Usage: $(call docker,<make-target>,<target-args>)
#| Example: $(call docker,test,foo.tests)
define docker
	@docker-compose run \
		--rm \
		--user="root" \
		--workdir="/app" \
		--entrypoint="make" \
		$(DOCKER_SERVICE) \
		-e HOST_ROOT_DIR="$(ROOT_DIR)" \
		$(if $(2),-e $(1)="$(2)") \
		$(1)
endef

#| Evaluate all "proxy" targets given on command line as real targets
#| which when invoked runs a mandatory defined proxy function with
#| the sub target, argument and options as function parameters.
#|
#| Usage:
#|   make <proxy>:<target>
#|   make <proxy>:<target>:<arg>
#|   make <proxy>:<target>:<arg> <target>="<options>"
#|
#| Example:
#|   make docker:test
#|   make docker:test:foo
#|   make docker:test:foo.tests test="--failfast"
#|
#| Last example will result in the following function call:
#|   $(call docker,test,--failfast foo.tests)

PROXY_DELIMITER := :
PROXY_DEBUG ?=
PROXY_TARGETS := $(foreach t,$(MAKECMDGOALS),$(if $(findstring $(PROXY_DELIMITER),$(t)),$(t)))

define create-proxy-target
.PHONY: $(subst $(PROXY_DELIMITER),\$(PROXY_DELIMITER),$(1))
$(subst $(PROXY_DELIMITER),\$(PROXY_DELIMITER),$(1)): PROXY := $(wordlist 1,1,$(subst $(PROXY_DELIMITER), ,$(1)))
$(subst $(PROXY_DELIMITER),\$(PROXY_DELIMITER),$(1)): TARGET := $(wordlist 2,2,$(subst $(PROXY_DELIMITER), ,$(1)))
$(subst $(PROXY_DELIMITER),\$(PROXY_DELIMITER),$(1)): ARGS := $(strip ${$(wordlist 2,2,$(subst $(PROXY_DELIMITER), ,$(1)))} $(wordlist 3,3,$(subst $(PROXY_DELIMITER), ,$(1))))
$(subst $(PROXY_DELIMITER),\$(PROXY_DELIMITER),$(1)):
	$(if $(PROXY_DEBUG),$$(info Calling proxy "$$(PROXY)" with $$$$(1)="$$(TARGET)" $$(if $$(ARGS),$$$$(2)="$$(ARGS)")))
	$$(call $$(PROXY),$$(TARGET),$$(ARGS))
endef

$(foreach t,$(PROXY_TARGETS),$(eval $(call create-proxy-target,$(t))))
