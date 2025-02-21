import { Link } from 'react-router';
import { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
// import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthProvider';
import { DataContext } from '../contexts/Data';

function Register() {
  const { handleRegister } = useContext(AuthContext);
  const { isDark } = useContext(DataContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegisterForm = async (e) => {
    e.preventDefault();
    const { userName, imageLink, email, password } = e.target;

    if (password.value.length < 8) {
      toast.error('Password should be at least 8 characters long');
      return;
    }

    setIsSubmitting(true);

    const user = {
      name: userName.value,
      image: imageLink.value,
      email: email.value,
      role: 'user',
      membership: 'free',
    };

    try {
      // Call handleRegister and wait for it to complete
      await handleRegister(
        userName.value,
        imageLink.value,
        email.value,
        password.value,
      );

      // Make the API call and wait for it to complete
      const response = await axios.post('http://localhost:4000/users', user);

      // If everything is successful, show a success message
      // toast.success('User Registration Success');
    } catch (error) {
      // If there's an error, show an error message
      console.error(error);
      toast.error('Failed to register. Please try again.');
    } finally {
      // Reset the submitting state regardless of success or failure
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-around">
      <form onSubmit={handleRegisterForm}>
        <div className="flex flex-col gap-3 px-4">
          <div>
            <span className="p-1">Full Name</span>
            <input
              required
              type="text"
              placeholder="Full Name"
              name="userName"
              className={`w-full px-4 py-2 border-2 ${
                isDark ? 'border-black/40' : 'border-white/40'
              }  rounded-lg`}
            />
          </div>
          <div>
            <span className="p-1">Your Image url</span>
            <input
              required
              type="text"
              placeholder="your image url .jpg/jpeg"
              name="imageLink"
              className={`w-full px-4 py-2 border-2 ${
                isDark ? 'border-black/40' : 'border-white/40'
              }  rounded-lg`}
            />
          </div>
          <div>
            <span className="p-1">Email</span>
            <input
              required
              type="email"
              placeholder="Email"
              name="email"
              className={`w-full px-4 py-2 border-2 ${
                isDark ? 'border-black/40' : 'border-white/40'
              }  rounded-lg`}
            />
          </div>
          <div>
            <span className="p-1">Password</span>
            <input
              required
              type="password"
              placeholder="Password"
              name="password"
              className={`w-full px-4 py-2 border-2 ${
                isDark ? 'border-black/40' : 'border-white/40'
              }  rounded-lg`}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-2 mt-4 ${
              isDark
                ? 'bg-black/70 border border-white text-white hover:border-white/70 hover:bg-black'
                : 'bg-white/70 border border-black text-black hover:border-white/10 hover:bg-white'
            } text-xl rounded-xl`}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>

      <p className="text-sm">
        Already a user?{' '}
        <Link to="/auth/login" className="underline">
          Login Here
        </Link>
        .
      </p>
      <Toaster />
    </div>
  );
}

export default Register;
