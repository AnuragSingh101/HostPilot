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
    className="bg-white border border-blue-200 px-4 py-3 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-blue-300 text-blue-900 text-base font-semibold transition-all duration-300"
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
    companyDetails: { companyName: '', companyWebsite: '', portfolioURL: '', street: '', city: '' },
    studentDetails: { instituteName: '', stream: '' },
    individualDetails: { purpose: '', workType: '' }
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
    console.log("Submitting form:", form);  // Debug
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, form);
      setMessage(res.data.message || 'Signup successful ✅');
      setTimeout(() => {
        navigate('/login');
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error("Signup error response:", err.response);
      setMessage(err.response?.data?.message || 'Signup failed ❌');
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-blue-100">
      {/* LEFT PANEL */}
      <div className="flex-1 flex flex-col justify-center px-10 py-14 md:py-0 bg-white">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-3xl md:text-4xl font-black text-blue-800 mb-5">Sign Up to HostPilot</h1>
          <p className="mb-6 text-blue-700 text-base font-medium">Get started with secure cloud panels in one click.</p>
          
          <form onSubmit={handleSubmit} className="space-y-7">
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
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded w-full shadow transition-all duration-300"
                >
                  Next →
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-5">
                  <label className="block text-sm font-bold text-blue-700">Account Type</label>
                  <Listbox value={form.accountType} onChange={(value) => setForm({ ...form, accountType: value })}>
                    <div className="relative">
                      <Listbox.Button className="border border-blue-200 px-4 py-3 rounded w-full text-left bg-white text-blue-900 font-semibold">
                        {accountTypes.find((t) => t.value === form.accountType)?.label || 'Select Type'}
                      </Listbox.Button>
                      <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="absolute mt-1 w-full bg-white border border-blue-200 rounded z-10">
                          {accountTypes.map((type) => (
                            <Listbox.Option
                              key={type.value}
                              value={type.value}
                              className="cursor-pointer px-4 py-2 hover:bg-blue-100 text-blue-900"
                            >
                              {type.label}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>

                  {/* EMPLOYEE FIELDS */}
                  {form.accountType === 'employee' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input name="companyName" placeholder="Company Name" onChange={handleExtraDetails} />
                      <Input name="companyWebsite" placeholder="Company Website" onChange={handleExtraDetails} />
                      <Input name="portfolioURL" placeholder="Portfolio URL" onChange={handleExtraDetails} />
                      <Input name="street" placeholder="Company Street" onChange={handleExtraDetails} />
                      <Input name="city" placeholder="Company City" onChange={handleExtraDetails} />
                    </div>
                  )}

                  {/* STUDENT FIELDS */}
                  {form.accountType === 'student' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input name="instituteName" placeholder="Institute Name" onChange={handleExtraDetails} />
                      <Input name="stream" placeholder="Stream" onChange={handleExtraDetails} />
                    </div>
                  )}

                  {/* INDIVIDUAL FIELDS */}
                  {form.accountType === 'individual' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input name="purpose" placeholder="Purpose" onChange={handleExtraDetails} />
                      <Listbox
                        value={form.individualDetails.workType || ''}
                        onChange={(value) => handleExtraDetails({ target: { name: 'workType', value } })}
                      >
                        <div className="relative">
                          <Listbox.Button className="border border-blue-200 px-4 py-3 rounded w-full text-left bg-white text-blue-900 font-semibold">
                            {workTypes.find((w) => w.value === form.individualDetails.workType)?.label || 'Select Work Type'}
                          </Listbox.Button>
                          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <Listbox.Options className="absolute mt-1 w-full bg-white border border-blue-200 rounded z-10">
                              {workTypes.map((type) => (
                                <Listbox.Option
                                  key={type.value}
                                  value={type.value}
                                  className="cursor-pointer px-4 py-2 hover:bg-blue-100 text-blue-900"
                                >
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

                <div className="flex justify-between gap-4 mt-7">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="border border-blue-400 text-blue-700 py-3 px-8 rounded font-semibold w-full hover:bg-blue-50"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded w-full shadow"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Alerts & Extra */}
          {message && <p className="mt-4 text-base text-red-500 text-center font-semibold">{message}</p>}
          <div className="mt-6 bg-blue-50 text-blue-600 p-3 rounded text-center text-base font-bold border border-blue-200">
            🎁 Use code <strong>WELCOME10</strong> for 10% off your first month!
          </div>
          <div className="mt-4 text-center text-base text-blue-700">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:underline">Sign In</Link>
          </div>
        </div>
      </div>

      {/* RIGHT VISUAL PANEL */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-tr from-blue-200 via-blue-300 to-blue-400">
        <div className="max-w-md w-full p-9 rounded-2xl shadow-2xl bg-white/80 text-center border border-blue-100 flex flex-col gap-6">
          <h2 className="text-2xl font-black text-blue-700 mb-2">Why HostPilot?</h2>
          <ul className="space-y-3 text-blue-700 font-medium">
            <li>🚀 Deploy panels/blazing fast</li>
            <li>🛡️ Built-in firewall & security</li>
            <li>🔒 Free SSL & instant backups</li>
            <li>🌙 Simple pricing, no hidden fees</li>
            <li>💬 24/7 expert support</li>
          </ul>
          <div className="bg-blue-50 rounded-xl p-5 shadow border border-blue-100 mt-7">
            <p className="italic text-blue-800 mb-1">&ldquo;The best hosting onboarding ever — smooth and secure!&rdquo;</p>
            <div className="text-right text-blue-700 font-bold">— Satisfied User</div>
          </div>
          <div className="mt-6 text-xs text-blue-400">
            End-to-end encryption &bull; 99.9% Uptime &bull; Powered by the cloud
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
