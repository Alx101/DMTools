# Use an official Python runtime as a parent image
FROM python:3.7 as app
LABEL maintainer="alex.ornberg@me.com"

# Set environment varibles
# Pinned versions
ENV PIP_PIP_VERSION 19.3.1
ENV PIP_PIP_TOOLS_VERSION 4.2.0
ENV APT_MAKE_VERSION 4.2.1-*
ENV APT_WAIT_FOR_IT_VERSION  0.0~git20180723-1

ENV PYTHONUNBUFFERED 1
ENV DJANGO_ENV dev

COPY ./reqs /code/reqs/
# Install any needed packages specified in requirements.txt
RUN set -x && pip install pip==$PIP_PIP_VERSION pip-tools==$PIP_PIP_TOOLS_VERSION && \
    pip install --require-hashes --pre -r /code/reqs/requirements.txt && \
    pip check

RUN pip install gunicorn

RUN set -x && \
    apt-get update && apt-get install --no-install-recommends -y \
    make=$APT_MAKE_VERSION \
    wait-for-it=$APT_WAIT_FOR_IT_VERSION

# Copy the current directory contents into the container at /code/
COPY ./src /code/

# Set the working directory to /code/
WORKDIR /code/

EXPOSE 8000
CMD exec gunicorn app.wsgi:application --bind 0.0.0.0:8000 --workers 3 --reload
