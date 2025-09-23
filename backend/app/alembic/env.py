import os
import sys
from logging.config import fileConfig

from sqlalchemy import engine_from_config, pool
from alembic import context
from sqlmodel import SQLModel

this_dir = os.path.dirname(os.path.abspath(__file__))
app_dir = os.path.dirname(this_dir)
repo_root = os.path.dirname(app_dir)

if repo_root not in sys.path:
    sys.path.insert(0, repo_root)

config = context.config
fileConfig(config.config_file_name)

db_url = os.environ.get("DATABASE_URL")
if db_url:
    config.set_main_option("sqlalchemy.url", db_url)

try:
    import app.api.models  # noqa: F401
except Exception:
    try:
        import api.models  # noqa: F401
    except Exception:
        # Give a helpful error
        raise RuntimeError(
            "Could not import your models module. "
            "Make sure the package root is on PYTHONPATH and that "
            "'app/api/models.py' exists. If you run alembic from a different cwd, "
            "run it from the repository root or adjust PYTHONPATH."
        )

target_metadata = SQLModel.metadata

def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
