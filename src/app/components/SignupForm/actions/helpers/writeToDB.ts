"use server";
import { createClient } from "redis";

const redis = await createClient({ url: process.env.REDIS_URL }).connect();

export const writeToDB = async (id: string, data: Record<string, unknown>) => {
  try {
    const userRecord = await redis.get(`user:${id}`);
    if (userRecord) {
      console.log("User record exists, updating...");
      await redis.set(
        `user:${id}`,
        JSON.stringify({ ...JSON.parse(userRecord), ...data })
      );
    } else {
      console.log("No existing user record, creating new...");
      await redis.set(`user:${id}`, JSON.stringify(data));
    }
  } catch (error) {
    console.error("Error writing to DB:", error);
    throw error;
  }
};
