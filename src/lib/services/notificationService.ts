import type { NewNotification, Notification } from '$lib/types';
import { sendDbRequest } from './dbService';

const table = 'notifications';

export async function saveNotification(notification: NewNotification): Promise<Notification> {
	try {
		const savedNotification = await sendDbRequest<Notification>(table, 'create', notification);
		return savedNotification;
	} catch (error) {
		console.error(error);
	}
}

export async function getNotifications(): Promise<Notification[]> {
	try {
		const notifications = await sendDbRequest<Notification[]>(table, 'read');
		return notifications;
	} catch (error) {
		console.error(error);
	}
}

export async function markNotificationAsRead(notification: Notification): Promise<Notification> {
	try {
		const updatedNotification = await sendDbRequest<Notification>(table, 'update', notification);
		return updatedNotification;
	} catch (error) {
		console.error(error);
	}
}

export async function deleteNotification(notification: Notification): Promise<void> {
	try {
		await sendDbRequest<Notification>(table, 'delete', notification);
	} catch (error) {
		console.error(error);
	}
}
