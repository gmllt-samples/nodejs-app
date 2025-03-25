PORT ?= 8080

run:
	@echo "Starting Node.js server on port $(PORT)..."
	@PORT=$(PORT) node app.js

.PHONY: run
