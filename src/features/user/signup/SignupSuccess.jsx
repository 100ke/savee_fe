import React from "react";
import { FaCheckCircle } from "react-icons/fa";

function SignupSuccess() {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <FaCheckCircle />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">Card Title</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default SignupSuccess;
