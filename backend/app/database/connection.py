from pymongo import MongoClient

from app.config.settings import settings


class MongoConnection:
    """Stores the shared MongoDB client and connection state."""

    client = None
    database = None
    is_connected = False


mongo = MongoConnection()


def connect_to_mongo():
    """Connect to MongoDB Atlas and keep the application alive on failure."""
    mongodb_uri = settings.MONGODB_URI
    database_name = settings.DATABASE_NAME

    if not mongodb_uri or not database_name:
        mongo.client = None
        mongo.database = None
        mongo.is_connected = False
        print("MongoDB Connection Error: MONGODB_URI and DATABASE_NAME are required")
        return

    try:
        client = MongoClient(mongodb_uri, serverSelectionTimeoutMS=5000)
        client.admin.command("ping")

        mongo.client = client
        mongo.database = client[database_name]
        mongo.is_connected = True
        print("MongoDB Connected Successfully")
    except Exception as error:
        mongo.client = None
        mongo.database = None
        mongo.is_connected = False
        print(f"MongoDB Connection Error: {error}")


def close_mongo_connection():
    """Close the MongoDB client when the FastAPI app shuts down."""
    if mongo.client is not None:
        mongo.client.close()

    mongo.client = None
    mongo.database = None
    mongo.is_connected = False


def get_database_status():
    """Return connected only when the stored client still responds to ping."""
    if mongo.client is None:
        mongo.is_connected = False
        return "disconnected"

    try:
        mongo.client.admin.command("ping")
        mongo.is_connected = True
        return "connected"
    except Exception as error:
        mongo.is_connected = False
        print(f"MongoDB Status Error: {error}")
        return "disconnected"
