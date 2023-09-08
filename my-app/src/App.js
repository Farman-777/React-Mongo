import { useEffect, useState } from "react";

function App() {
const [form,setForm] = useState({})
const [users,setUsers] = useState({})
const handleChange = (e) => {
// console.log(e.target.value,e.target.name);
setForm({ ...form, [e.target.name] : e.target.value })
}
const getUsersData = async () => {
  const resultGet = await fetch("http://localhost:8000/getData",{
    method:"GET",
  })
  const dataGet = await resultGet.json();
  setUsers(dataGet)
  console.log(dataGet)
}
 

const handleSubmit = async (e) => {
  e.preventDefault();
 const result =  await fetch("http://localhost:8000/addData",{
  method:'POST',
  body:JSON.stringify(form),
  headers:{
    'Content-Type':'application/json'
  }
  })
  const data = await result.json();
  console.log("form : ", form)
  console.log("result : ", result)
  console.log("data : ",data)
  getUsersData();
}

useEffect(()=>{
getUsersData();
},[])

  return (
    <div className="App">
      <p>{JSON.stringify(form)}</p>
      <form onSubmit={handleSubmit}>
        <span>Username : </span>
        <input type="text" name="username" onChange={handleChange}/><br/>
        <span>Password : </span>
        <input type="text" name="password" onChange={handleChange}/><br/>
        <input type="submit" value="Submit" />
      </form>
      <div>
        <ul>
          {
            users.length > 0 && users.map(user => (<li key={user._id}>{user.username},{user.password}</li>))
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
