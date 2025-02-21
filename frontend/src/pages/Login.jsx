import { Link } from 'react-router';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { DataContext } from '../contexts/Data';

function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signInWithGoogle, handleLogin } = useContext(AuthContext);
  const { isDark } = useContext(DataContext);

  const handleLoginForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true

    const { email, password } = e.target;

    try {
      // Call handleLogin and wait for it to complete
      await handleLogin(email.value, password.value);
      // If login is successful, you can add a success message or redirect the user
    } catch (error) {
      // Handle any errors (e.g., display an error message)
      console.error('Login failed:', error);
    } finally {
      // Reset the submitting state regardless of success or failure
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-around">
      <form onSubmit={handleLoginForm}>
        <div className="flex flex-col gap-3 px-4">
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
            disabled={isSubmitting} // Disable the button when submitting
            className={`px-8 py-2 mt-4 ${
              isDark
                ? 'bg-black/70 border border-white text-white hover:border-white/70 hover:bg-black'
                : 'bg-white/70 border border-black text-black hover:border-white/10 hover:bg-white'
            } text-xl rounded-xl`}
          >
            {isSubmitting ? 'Loading...' : 'Login'}
          </button>
        </div>
      </form>

      <div className="divider -my-3">OR</div>
      <div
        onClick={signInWithGoogle}
        // className="text-lg px-4 py-2 bg-white/10 rounded-full"
        className={`px-4 py-2 border-2 ${
          isDark ? 'border-black/40' : 'border-white/40'
        }  rounded-full`}
      >
        <button className="flex items-center gap-2">
          <p>Continue with</p>
          <img
            className="w-16 mt-1"
            src="https://pngimg.com/d/google_PNG19644.png"
            alt="google icon"
          />
        </button>
      </div>

      <p className="text-sm">
        Not a user?{' '}
        <Link to="/auth/register" className="underline">
          Register Here
        </Link>
        .
      </p>
    </div>
  );
}

export default Login;
