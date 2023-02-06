import type { NewNotification, Notification } from '$lib/types';
import { sendDbRequest } from './dbService';

const table = 'notifications';

export async function saveNotification(notification: NewNotification): Promise<Notification> {
	const savedNotification = await sendDbRequest<Notification>(table, 'create', notification);
	return savedNotification;
}

export async function getNotifications(): Promise<Notification[]> {
	const notifications = await sendDbRequest<Notification[]>(table, 'read');
	return notifications;
}

export async function markNotificationAsRead(notification: Notification): Promise<Notification> {
	const updatedNotification = await sendDbRequest<Notification>(table, 'update', notification);
	return updatedNotification;
}

export async function deleteNotification(notification: Notification): Promise<void> {
	await sendDbRequest<Notification>(table, 'delete', notification);
}
