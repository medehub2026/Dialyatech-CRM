import { repository } from "../repositories/crudRepository.js";

const activities = repository("activities", "act");

export async function logActivity({ leadType, leadId, actionType, description, performedBy }) {
  return activities.create({ leadType, leadId, actionType, description, performedBy });
}
