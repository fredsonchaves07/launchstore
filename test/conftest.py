import pytest
from app import create_app
from dynaconf import settings


@pytest.fixture()
def app():
    app = create_app()
    settings.SECRET_KEY = "X65Ca89C2V0asf9qFV"
    return app
