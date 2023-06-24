import React,{useState,  useEffect} from "react";
import { Container, Row, Col,FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { storage } from "../firebase.config";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import '../style/login.css'

function SignUp() {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState(null)
  const [loading,setLoading] = useState(false)
 const navigate = useNavigate();
  const signup =async(e)=>{
    e.preventDefault();
    setLoading(true);
    try{
   const userCredential = await createUserWithEmailAndPassword(auth,email,password)
   const user = userCredential.user;
   const storageRef = ref(storage,`images/${Date.now()+ name}`)
   const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on((err)=>{
    toast.err(err.message)
  },()=>{
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadUrl)=>{
      //update User profile
     await updateProfile(user,{
        displayName: name ,
        photoURL: downloadUrl,
      });
      //store user data in firebase database
      await setDoc(doc(db,'users',user.uid),{
        uid : user.uid,
        displayName : name ,
        email,
        photoURL : downloadUrl,
      })
    });
  })
   setLoading(false);
   toast.success("Account Created 👍")
   navigate('/login')
   
    } catch (err){
      setLoading(false)
      toast.error(err.message);
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  })
  return (
<Helmet title="Signup">
  <section>
    <Container>
      <Row>
       {
        loading ? <Col lg='12' className=" text-center"><h5 className=" fw-bold">Loading.....</h5></Col> : <Col lg='6' className="m-auto text-center">
        <h3 className=" fw-bold fs-4 mb-4">Sign Up</h3>
        <form action="" className='auth_form' onSubmit={signup}>
          <FormGroup className='form_group'>
      <input type="text" placeholder='Enter Your Name' value={name} onChange={ e => setName(e.target.value)} />
          </FormGroup>
          <FormGroup className='form_group'>
      <input type="email" placeholder='Enter Your Email' value={email} onChange={ e => setEmail(e.target.value)} />
          </FormGroup>
          <FormGroup className='form_group'>
      <input type=" password" placeholder='Enter Your Password' value={password} onChange={ e => setPassword(e.target.value)} />
          </FormGroup>
          <FormGroup className='form_group'>
      <input type= "file"   onChange={ e => setFile(e.target.files[0])} />
          </FormGroup>
          <button type= " submit" className="buy_btn login_btn">SignUp</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
            
          </form>
        </Col> 
       }
      </Row>
    </Container>
  </section>
</Helmet>
  );
}

export default SignUp;
