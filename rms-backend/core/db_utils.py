import psycopg2
from django.conf import settings
import contextlib

def get_db_connection():
    """
    Get a database connection from settings.
    """
    return psycopg2.connect(
        dbname=settings.DATABASES['default']['NAME'],
        user=settings.DATABASES['default']['USER'],
        password=settings.DATABASES['default']['PASSWORD'],
        host=settings.DATABASES['default']['HOST'],
        port=settings.DATABASES['default']['PORT'],
    )

@contextlib.contextmanager
def get_cursor():
    """
    Context manager for database cursor.
    Usage:
        with get_cursor() as cursor:
            cursor.execute("SELECT * FROM table")
    """
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        yield cursor
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        cursor.close()
        conn.close()
