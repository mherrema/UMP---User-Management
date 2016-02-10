var UMPApp;
(function (UMPApp) {
    var Notification = (function () {
        function Notification() {
        }
        return Notification;
    }());
    UMPApp.Notification = Notification;
    var NotificationService = (function () {
        function NotificationService($timeout) {
            this.$timeout = $timeout;
            this.currentNotification = { notificationText: "", success: false, error: false, active: false };
        }
        NotificationService.prototype.showNotification = function (text, type) {
            console.log("show notification");
            this.currentNotification.notificationText = text;
            if (type == "success") {
                this.currentNotification.success = true;
                this.currentNotification.error = true;
            }
            else if (type == "error") {
                this.currentNotification.success = false;
                this.currentNotification.error = true;
            }
            this.currentNotification.active = true;
            this.$timeout(function () {
                console.log('update with timeout fired');
                this.currentNotification = { notificationText: "", success: false, error: false, active: false };
            }, 5000);
        };
        return NotificationService;
    }());
    UMPApp.NotificationService = NotificationService;
})(UMPApp || (UMPApp = {}));
//# sourceMappingURL=NotificationService.js.map