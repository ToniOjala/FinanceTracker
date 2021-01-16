import { BalanceLog, KeyValuePair, NewBalanceLog } from "../../../shared/types";
import BalanceLogService from "../../DataAccess/services/balanceLogService";

let balanceLogService: BalanceLogService;

export function handleBalanceLogRequest(requestType: string, data?: KeyValuePair, query?: KeyValuePair): BalanceLog | BalanceLog[] | KeyValuePair | boolean {
  balanceLogService = new BalanceLogService();
  
  switch (requestType) {
    case 'getMany':
      if (!query || !query.categoryId) throw new Error('Category ID was not given');
      return handleGetMany(query.categoryId as number);
    case 'post':
      if (!data) throw new Error('Data to post was not given');
      return handlePost(data.item as NewBalanceLog);
    case 'delete':
      if (!data) throw new Error('Data to delete was not given');
      return handleDelete(data.item as BalanceLog);
    case 'update':
      if (!data) throw new Error('Data to update was not given');
      return handleUpdate(data.item as BalanceLog);
    default:
      throw new Error(`Request method not recognized: ${requestType}`);
  }
}

function handleGetMany(categoryId: number): BalanceLog[] {
  return balanceLogService.getBalanceLogs(categoryId);
}

function handlePost(balanceLog: NewBalanceLog): BalanceLog {
  const id = balanceLogService.saveBalanceLog(balanceLog);
  return balanceLogService.getBalanceLog(id);
}

function handleDelete(balanceLog: BalanceLog): boolean {
  balanceLogService.deleteBalanceLog(balanceLog);
  const deletedLog = balanceLogService.getBalanceLog(balanceLog.id);
  return (deletedLog == null);
}

function handleUpdate(balanceLog: BalanceLog): BalanceLog {
  balanceLogService.updateBalanceLog(balanceLog);
  return balanceLogService.getBalanceLog(balanceLog.id);
}