import React, { useState } from "react";

interface AlertProps {
  message: string;
}

const Alert: React.FC<AlertProps> = ({ message }) => {
  const [showAlert, setShowAlert] = useState(true);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      {showAlert && (
        <div className="alert alert-danger alert-dismissible show" role="alert">
          <h4 className="alert-heading">
            <strong>Warning!</strong>
          </h4>
          {message}
          <button
            type="button"
            className="btn-close"
            onClick={handleCloseAlert}
            aria-label="Close"
          ></button>
        </div>
      )}
    </>
  );
};

export default Alert;
