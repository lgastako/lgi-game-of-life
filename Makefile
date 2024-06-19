help: ## Display this help text
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

SHOW:=$(shell which bat || echo "cat")
show: ## Show the Makefile
	@$(SHOW) Makefile

open:  ## Open the page in the browser
	open ./index.html

type-check:  ## Check types
	tsc --noEmit

watch-types:  ## Watch types
	tsc --noEmit --watch

o: open
tc: type-check
wt: watch-types
