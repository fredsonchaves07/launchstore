#!/bin/bash
poetry run flask db upgrade
poetry run flask user-admin
poetry run flask run --host=0.0.0.0