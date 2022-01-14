import { notification } from 'antd'

class NotificationService {
  openNotification({ type, message = '', description, duration }) {
    notification[type]({
      message: `${type}: ${message}`,
      description,
      duration,
    })
  }
}
export const notificationService = new NotificationService()
