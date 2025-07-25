# How to build and run the PlayWright script all-in-one
```
docker compose up --build --abort-on-container-exit && docker compose down
```

# Build once, and run later with Cron job
```
docker build -t hiltron-restarter .
docker compose up --abort-on-container-exit && docker compose down
```

# Steps to do before building and running
1. Create a new .env file from the .env.example
2. Fill the fields given in the .env file
