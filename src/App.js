import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
const App = () => {
 
    const [user, setuser] = useState([])

    const [name, setname] = useState("")
    const [mobilenumber, setmobilenumber] = useState("")
    const [email, setemail] = useState("")

    const [popup, setpopup] = useState(false)

    const [editID, seteditID] = useState("")

    const [editedName, seteditedName] = useState("")
    const [editedmobileNumber, seteditedmobileNumber] = useState("")
    const [editedemail, seteditedemail] = useState("")


    const getuser = async()=>{
        try {
            const resp = await axios.get("https://667b946fbd627f0dcc9310bd.mockapi.io/api/users")
            setuser(resp.data);
          } catch (error) {
            console.log(error);
          }
    }

    useEffect(()=>{
        getuser()
    },[])

    // console.log(user);

    const handleCreate = async(e) =>{
        e.preventDefault()
        try {
            const newUser  = {
                name : name,
                email: email,
                mobilenumber: mobilenumber
            }
            await axios.post("https://667b946fbd627f0dcc9310bd.mockapi.io/api/users",newUser)
            alert('new user created ')
            getuser()
            setname('')
            setemail("")
            setmobilenumber('')
        } catch (error) {
            console.log(error);
        }
    }

  

    const handleEdit =(id)=>{
        setpopup(true)
        seteditID(id)
    }

    const handleEditClose =(id)=>{
        setpopup(false)
    }

    // console.log(editID);

    const handleEditUser = async(e) =>{
        e.preventDefault()
        const editedUser = {
            name:editedName,
            mobilenumber : editedmobileNumber,
            email:editedemail
        }
        try {
            await axios.put("https://667b946fbd627f0dcc9310bd.mockapi.io/api/users/"+editID,editedUser)
            alert('user updated')
            setpopup(false)
            seteditedName("")
            seteditedemail("")
            seteditedmobileNumber("")
        } catch (error) {
            console.log(error);
        }
    }


    const handleDelete = async(id) =>{
        try {
            await axios.delete("https://667b946fbd627f0dcc9310bd.mockapi.io/api/users/"+id)
            alert('user deleted')
            getuser()
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div >
        <div className='main-container'>
        <form  onSubmit={handleCreate}>
        <h2 style={{textAlign:"center"}}>Create User</h2>
            <input type="text" value={name} onChange={(e)=>setname(e.target.value)} placeholder='Enter Username' required/>
            <br /><br />
            <input type="email" value={email} onChange={(e)=>setemail(e.target.value)} placeholder='Enter EMail-ID' required/>
            <br /> <br />
            <input type="text" value={mobilenumber} onChange={(e)=>setmobilenumber(e.target.value)} placeholder='Enter Mobile Number' required/>
            <br /> <br />
            <button className='option-btn'>Create</button>
        </form>
        <div className='table-scroller'>
            <table>
                <thead>
                    <tr>
                        <th>USER ID</th>
                        <th>USER NAME</th>
                        <th>USER MAILID</th>
                        <th>USER MOBILENUMBER</th>
                        <th>OPTIONS</th>
                    </tr>
                </thead>
                <tbody>
                {user.map((item,index)=>{
                    return (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.mobilenumber}</td>
                            <td>
                                <button className='option-btn' onClick={()=>handleEdit(item.id)}>EDIT</button>
                                <button className='option-btn' onClick={()=>handleDelete(item.id)}>DELETE</button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
        </div>
        {popup
         ? 
         <div className='edit-container'>
        <h2 style={{textAlign:"center"}}>Edit User</h2>
        <form className='edit-form' onSubmit={handleEditUser}>
            <input type="text" value={editedName}  onChange={(e)=>seteditedName(e.target.value)} placeholder='Enter Username' required/>
            <br /><br />
            <input type="email" value={editedemail}  onChange={(e)=>seteditedemail(e.target.value)} placeholder='Enter EMail-ID' required/>
            <br /> <br />
            <input type="text" value={editedmobileNumber}  onChange={(e)=>seteditedmobileNumber(e.target.value)} placeholder='Enter Mobile Number' required/>
            <br /> <br />
            <button className='option-btn'>Edit</button>
        </form>
         <button className='edit-btn' onClick={handleEditClose}>x</button>
         </div>
        :
        ""}
    </div>
  )
}


export default App