import "dotenv/config";

interface Environment {
  port: number;
  databaseUrl: string;
}

export const environment: Environment = {
  port: parseInt(process.env.PORT || "3000", 10),
  databaseUrl: process.env.DATABASE_URL || "mongodb://localhost:27017/myapp",
};
