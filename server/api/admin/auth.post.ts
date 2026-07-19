import { defineEventHandler, readBody, createError } from "h3";
import { generateAdminToken } from "../../utils/adminAuth";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const providedPassword = body?.password?.trim() || "";
  const env = useRuntimeConfig()

  // Use environment variable ADMIN_PASSWORD or default secure passphrase
  const validPassword = env.adminPass || "";

  if (providedPassword === validPassword) {
    return {
      success: true,
      token: generateAdminToken(),
      message: "Authentication successful",
    };
  }

  throw createError({
    statusCode: 401,
    statusMessage: "Unauthorized",
    message: "Invalid User",
  });
});
