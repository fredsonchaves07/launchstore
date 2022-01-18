pytest:
	FLASK_ENV=test poetry run pytest -v
	rm  -f -r tmp/*test*