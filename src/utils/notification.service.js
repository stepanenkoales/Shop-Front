import { notification } from 'antd'

class NotificationService {
  openNotification(type, message, description) {
    notification[type]({
      message: 'Error: ' + message,
      description,
      default: 6,
    })
  }
}
export const notificationService = new NotificationService()
