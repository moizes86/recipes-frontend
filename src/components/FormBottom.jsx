import React from "react";
import Spinner from "./Spinner";

export default function FormBottom({ loading, error, btnText, children}) {
  return (
    <div className="mt-4">
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {children}

          <div className="py-3 d-flex justify-content-center">
            <button type="submit" className="btn btn-primary mr-4">
              {btnText}
            </button>
          </div>

          <div className="text-danger h5">
            <p className="text-center">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
