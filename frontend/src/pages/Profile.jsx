import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { DataContext } from '../contexts/Data';

function Profile() {
  const { handleSingOut } = useContext(AuthContext);
  const { isDark } = useContext(DataContext);
  console.log(isDark);
  return (
    <div>
      <div>Profile</div>
      <button onClick={handleSingOut}>bye</button>
    </div>
  );
}

export default Profile;
