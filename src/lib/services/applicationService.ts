import type { ApplicationData } from "src/types";
import { sendDbRequest } from "./dbService";

const table = 'application';

export async function getLastOpenedDate (): Promise<string> {
  try {
    const appData = await sendDbRequest<ApplicationData>(table, 'read');
    return appData.lastOpened
  } catch (error) {
    console.error(error);
  }
}

export async function updateLastOpenedDate (date: string): Promise<void> {
  try {
    await sendDbRequest(table, 'update_last_opened', date);
  } catch (error) {
    console.error(error);
  }
}