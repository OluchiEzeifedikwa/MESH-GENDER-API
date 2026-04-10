import { classifyQuerySchema } from "../schemas/classify.schema.js";
import { fetchGenderPrediction } from "../services/genderize.service.js";

export const classifyName = async (req, res, next) => {
  try {
    const parsed = classifyQuerySchema.safeParse(req.query);

    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      const isTypeMismatch = issue.code === "invalid_type" && issue.received !== "undefined";
      const error = new Error(issue.message);
      error.status = isTypeMismatch ? 422 : 400;
      throw error;
    }

    const { name } = parsed.data;
    const result = await fetchGenderPrediction(name.trim());

    return res.status(result.httpStatus).json(result.body);
  } catch (err) {
    next(err);
  }
};
