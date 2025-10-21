import "./Notification.scss";

const NOTIFICATION_CLASSES = {
    errorMsg: "error-msg",
    itemAddedMsg: "item-added-msg",
    successMsg: "success-msg",
    paymentFailedMsg: "payment-failed-msg"
}

export function Notification({ children, notificationClass = "itemAddedMsg", ...otherProps }) {
    const mappedClass = NOTIFICATION_CLASSES[notificationClass] || "";

    return (
        <article className={`notification ${mappedClass}`} role="alert">
            <span className="notification-text">{children}</span>
        </article>
    );
}