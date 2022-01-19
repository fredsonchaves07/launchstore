import pytest
from app import create_app
from app.ext.database import db
from dynaconf import settings


@pytest.fixture()
def app():
    app = create_app()
    settings.SECRET_KEY = "X65Ca89C2V0asf9qFV"
    return app


@pytest.fixture(scope="session", autouse=True)
def set_test_settings():
    settings.configure(FORCE_ENV_FOR_DYNACONF="test")


@pytest.fixture()
def database(app):
    db.create_all()
    yield
    db.drop_all()
