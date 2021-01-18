import { BalanceLog, KeyValuePair, NewBalanceLog } from "../../../shared/types";
import BalanceLogService from "../../DataAccess/services/balanceLogService";

let balanceLogService: BalanceLogService;

export function handleBalanceLogRequest(requestType: string, data?: KeyValuePair, query?: KeyValuePair): BalanceLog | BalanceLog[] | KeyValuePair | boolean | number {
  balanceLogService = new BalanceLogService();
  
  switch (requestType) {
    case 'getMany':
      if (!query || !query.categoryId || !query.page) throw new Error('Query parameters were not given');
      return handleGetMany(query.categoryId as number, query.page as number);
    case 'getCount':
      if (!query || !query.categoryId) throw new Error('Category ID was not given');
      return handleGetCount(query.categoryId as number);
    case 'post':
      if (!data) throw new Error('Data to post was not given');
      return handlePost(data.item as NewBalanceLog);
    case 'update':
      if (!data) throw new Error('Data to update was not given');
      return handleUpdate(data.item as BalanceLog);
    default:
      throw new Error(`Request method not recognized: ${requestType}`);
  }
}

function handleGetMany(categoryId: number, page: number): BalanceLog[] {
  return balanceLogService.getBalanceLogs(categoryId, page);
}

function handleGetCount(categoryId: number): number {
  return balanceLogService.getCountOfBalanceLogs(categoryId);
}

function handlePost(balanceLog: NewBalanceLog): BalanceLog {
  const id = balanceLogService.saveBalanceLog(balanceLog);
  return balanceLogService.getBalanceLog(id);
}

function handleUpdate(balanceLog: BalanceLog): BalanceLog {
  balanceLogService.updateBalanceLog(balanceLog);
  return balanceLogService.getBalanceLog(balanceLog.id);
}