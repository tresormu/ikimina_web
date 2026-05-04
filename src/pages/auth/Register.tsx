import React from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Register Your Group</h2>
        <p className="mt-2 text-sm text-gray-600">Create your IkiminaPass account and start building your Credit Passport history.</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <input className="input" placeholder="Group name" />
        <input className="input" placeholder="Treasurer full name" />
        <input className="input" placeholder="Phone number (+250...)" />
        <input className="input" type="email" placeholder="Email address" />
        <button type="submit" className="btn btn-primary btn-md w-full">Create Account</button>
      </form>

      <p className="text-sm text-gray-600">
        Already registered? <Link to="/login" className="text-primary-600 hover:text-primary-500">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
