module UMPApp
{
  export class Notification
  {
    notificationText: string;
    success: boolean;
    error: boolean;
    active: boolean;
  }

  export class NotificationService
  {
    currentNotification: Notification;
    notificationActive: boolean;
    $timeout: ng.ITimeoutService;

    constructor($timeout: ng.ITimeoutService)
    {
      this.$timeout = $timeout;
      this.currentNotification = {notificationText: "", success: false, error: false, active: false};
    }

    showNotification(text: string, type: string):void
    {
      console.log("show notification");
      this.currentNotification.notificationText = text;
      if(type == "success"){
        this.currentNotification.success = true;
        this.currentNotification.error = true;
      }
      else if(type == "error"){
        this.currentNotification.success = false;
        this.currentNotification.error = true;
      }

      this.currentNotification.active = true;
      this.$timeout(function() {
        console.log('update with timeout fired');
        this.currentNotification = {notificationText: "", success: false, error: false, active: false};
      }, 5000);
    }
  }
}
