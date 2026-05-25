import React from "react";

const LoadingSpinner = ({ size = "medium", fullScreen = false }) => {
    const sizeClasses = {
        small: "spinner-small",
        medium: "spinner-medium",
        large: "spinner-large",
    };

    const spinner = (
        <div className={`loading-spinner ${sizeClasses[size]}`}>
            <div className="spinner-circle"></div>
        </div>
    );

    if (fullScreen) {
        return (
            <div className="loading-spinner-overlay">
                {spinner}
            </div>
        );
    }

    return spinner;
};

export default LoadingSpinner;
