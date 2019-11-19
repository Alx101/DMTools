FROM python:3.7 AS app-prod

# Install app systems dependencies
# - libpq-dev           postgres, psycopg2
# - postgresql-client   psql for wait-for-postgres.sh
RUN \
    # System deps
    apt-get update && apt-get install -y \
        libpq-dev \
        postgresql-client && \
    \
    # Wait script
    curl -sSL https://github.com/ufoscout/docker-compose-wait/releases/download/2.4.0/wait -o /bin/wait && \
        chmod +x /bin/wait && \
    \
    # Install Poetry using their official installer. This method, compared to
    # installing from PyPi, ensures that the Poetry depencies are isolated from
    # the project dependencies. Not having them separated caused some problems.
    # (See related issue: https://github.com/sdispater/poetry/issues/653).
    (curl -sSL https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py | python) && \
    \
    # Make app dir
    mkdir /app

COPY Makefile ./app/Makefile

WORKDIR /app


# Copy source code
COPY . src

WORKDIR /app/src

RUN pip install --user --requirement reqs/requirements.txt

# Stage: app-test
# To be used when running tests.
FROM app-prod AS app-test

# Stage: app-dev
# To be used when running the image locally for development purposes.
FROM app-test AS app-dev
