import {useState, useEffect} from 'react'
import {getAuth, updateProfile} from 'firebase/auth'
import {toast} from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'
import {updateDoc, doc} from 'firebase/firestore'
import {db} from '../firebase.config'

function Profile() {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
  const navigate = useNavigate() 
  const [formData,setFormData] = useState({
    name:auth.currentUser.displayName,
    email:auth.currentUser.email
  })

  const handleLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const {name, email} = formData

  const onSubmit = async() => {
    try {
      if (auth.currentUser.displayName!== name) {
        await updateProfile(auth.currentUser, {
          displayName:name
        })

        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {name})
      }
    } catch (error) {
      toast.error('Update Failed')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  
  
  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile</p>
        <button type='button' className='logOut' onClick={handleLogout}>Logout</button>
      </header>
      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p className='changePersonalDetails' onClick={() => {
            changeDetails && onSubmit()
            setChangeDetails((prevState) => !prevState)
          }}>
            {changeDetails ? 'done' : 'Change'}
          </p>
        </div>
        <div className='profileCard'>
          <form>
            <input type="text" id='name' 
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input type="text" id='email' 
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
      </main>
    </div>
  )
}

export default Profile