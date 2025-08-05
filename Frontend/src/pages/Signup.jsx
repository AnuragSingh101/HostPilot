import React, { useState, Fragment } from 'react';
import axios from 'axios';
import { Listbox, Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';

const Input = ({ name, placeholder, type = 'text', value, onChange }) => (
  <input
    name={name}
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={onChange}
    className="bg-white text-gray-900 border border-gray-300 px-4 py-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 placeholder:text-gray-400"
  />
);

const accountTypes = [
  { value: 'individual', label: 'Individual' },
  { value: 'student', label: 'Student' },
  { value: 'employee', label: 'Employee' },
];

const workTypes = [
  { value: 'freelancing', label: 'Freelancing' },
  { value: 'personal_project', label: 'Personal Project' },
];

const Signup = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    address: { street: '', city: '', state: '', zip: '' },
    accountType: 'individual',
    companyDetails: {},
    studentDetails: {},
    individualDetails: {}
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in form.address) {
      setForm({ ...form, address: { ...form.address, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleExtraDetails = (e) => {
    const { name, value } = e.target;
    if (form.accountType === 'employee') {
      setForm({ ...form, companyDetails: { ...form.companyDetails, [name]: value } });
    } else if (form.accountType === 'student') {
      setForm({ ...form, studentDetails: { ...form.studentDetails, [name]: value } });
    } else {
      setForm({ ...form, individualDetails: { ...form.individualDetails, [name]: value } });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, form);
      setMessage(res.data.message || 'Signup successful ✅');

      // ✅ Redirect to /login
      setTimeout(() => {
        navigate('/login');
        window.location.reload();
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed ❌');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT */}
      <div className="bg-blue-800 text-white flex flex-col justify-between p-10 relative">
        <div className="text-white text-2xl font-bold absolute top-6 left-6">HostPilot</div>

        <div className="flex-1 flex flex-col justify-center mt-10">
          <h1 className="text-4xl font-bold mb-4 leading-snug">Build Your Project with HostPilot</h1>
          <p className="text-base text-blue-100 mb-8">
            Powerful, secure, and flexible infrastructure to get your apps live — fast.
          </p>
          <ul className="list-disc pl-5 text-sm text-blue-100 space-y-2 mb-10">
            <li>🚀 Instant project deployment</li>
            <li>📊 Smart analytics and insights</li>
            <li>🛠️ Developer-first toolkit</li>
          </ul>
          <div className="bg-blue-700 p-6 rounded-lg shadow-md max-w-md">
            <p className="italic mb-2">“Onboarded in minutes!”</p>
            <p className="text-sm">Great UI, flexible hosting, and seamless experience all in one place.</p>
            <p className="mt-4 text-sm font-semibold text-right">— Anurag Singh ⭐⭐⭐⭐⭐</p>
          </div>
        </div>

        <div className="text-xs text-blue-200 mt-10">
          <p>🔐 End-to-End Encryption</p>
          <p className="mt-2">Trusted by AWS • Vercel • DigitalOcean</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="p-10 bg-white flex flex-col justify-center relative">
        <div className="text-blue-800 text-2xl font-bold absolute top-6 left-6">HostPilot</div>
        <h2 className="text-3xl font-bold mb-6 text-blue-900 mt-16">Sign Up for Free</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="fullName" placeholder="Full Name" onChange={handleChange} />
                <Input name="phone" placeholder="Phone Number" onChange={handleChange} />
                <Input name="email" placeholder="Email Address" type="email" onChange={handleChange} />
                <Input name="password" placeholder="Password" type="password" onChange={handleChange} />
                <Input name="street" placeholder="Street" onChange={handleChange} />
                <Input name="city" placeholder="City" onChange={handleChange} />
                <Input name="state" placeholder="State" onChange={handleChange} />
                <Input name="zip" placeholder="Zip Code" onChange={handleChange} />
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-md w-full transition-all duration-300"
              >
                Next →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                <Listbox value={form.accountType} onChange={(value) => setForm({ ...form, accountType: value })}>
                  <div className="relative">
                    <Listbox.Button className="border border-gray-300 px-4 py-3 rounded-md w-full text-left bg-white font-medium">
                      {accountTypes.find((t) => t.value === form.accountType)?.label || 'Select Type'}
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                      <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md z-10">
                        {accountTypes.map((type) => (
                          <Listbox.Option key={type.value} value={type.value} className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                            {type.label}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>

                {form.accountType === 'employee' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input name="companyName" placeholder="Company Name" onChange={handleExtraDetails} />
                    <Input name="companyWebsite" placeholder="Company Website" onChange={handleExtraDetails} />
                    <Input name="portfolioURL" placeholder="Portfolio URL" onChange={handleExtraDetails} />
                    <Input name="street" placeholder="Company Street" onChange={handleExtraDetails} />
                    <Input name="city" placeholder="Company City" onChange={handleExtraDetails} />
                  </div>
                )}

                {form.accountType === 'student' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input name="instituteName" placeholder="Institute Name" onChange={handleExtraDetails} />
                    <Input name="stream" placeholder="Stream" onChange={handleExtraDetails} />
                  </div>
                )}

                {form.accountType === 'individual' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input name="purpose" placeholder="Purpose" onChange={handleExtraDetails} />
                    <Listbox
                      value={form.individualDetails.workType || ''}
                      onChange={(value) =>
                        handleExtraDetails({ target: { name: 'workType', value } })
                      }
                    >
                      <div className="relative">
                        <Listbox.Button className="border border-gray-300 px-4 py-3 rounded-md w-full text-left bg-white font-medium">
                          {workTypes.find((w) => w.value === form.individualDetails.workType)?.label || 'Select Work Type'}
                        </Listbox.Button>
                        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                          <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md z-10">
                            {workTypes.map((type) => (
                              <Listbox.Option key={type.value} value={type.value} className="cursor-pointer px-4 py-2 hover:bg-gray-100">
                                {type.label}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                )}
              </div>

              <div className="flex justify-between gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="border border-gray-300 text-gray-800 py-3 px-6 rounded-md w-full hover:bg-gray-100 transition-all duration-300"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-md w-full transition-all duration-300"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </form>

        {message && <p className="mt-4 text-sm text-red-500 text-center font-medium">{message}</p>}

        <div className="mt-6 bg-blue-100 text-blue-800 p-3 rounded text-center text-sm font-medium">
          🎁 Use code <strong>WELCOME10</strong> to get 10% off your first month!
        </div>

        {/* ✅ FIXED: Login link */}
        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
