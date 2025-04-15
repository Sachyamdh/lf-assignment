if pgrep -x "postgres" > /dev/null
then
    echo "🛑 PostgreSQL is running, stopping it..."
    sudo systemctl stop postgresql
else
    echo "✅ PostgreSQL is already stopped."
fi

    sudo docker-compose up --build 
    echo "✅ PostgreSQL started successfully."
    echo "✅ PostgreSQL is running."
    echo "✅ PostgreSQL is running on port 5432."
