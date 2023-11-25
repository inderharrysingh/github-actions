import { useState , useEffect } from 'react'
import './App.css'
import { Card } from './Card'
import axios from 'axios';

export const apiUrl = 'https://2dwxsedttb.execute-api.us-east-1.amazonaws.com/dev/';

function App() {

  const [ todo , setTodo ] = useState<any[]>([]);
  const [inputString , setInput ] = useState<string>('');
  const [ change , setChange ] = useState(false)



  function makeid( length : number) : string  {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  
  
  function createTodo(todo : String  ) {
    const id = makeid(9)
    const item = {id : id , todo : todo , done : false }
    setTodo(prevItems => [...prevItems , item ])
    
    console.log(item)
    axios.post(`${apiUrl}/create`, item ) 
    .then(response => {
        
        console.log('Response:', response.data);
    })
    .catch(error => {
       
        console.error('Error:', error);
    });
  
  }
  


  useEffect( () => {

    fetch(`${apiUrl}/all`).then(function(response) {
      return response.json();
      }).then(function(data) {
        setTodo(data.body)
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
      });


  }, [change] )



  function handleAdd(){
      createTodo(inputString)
      setInput('')
  }

  
  

  return (
    <>
      <h1>Todo Application</h1>
      <div className="subscribe">
                      <p>TODO</p>
                        <input placeholder="task..." className="subscribe-input" value={inputString} onChange={(e) => setInput(e.target.value)}  />
                      <br/>
                      <div onClick={handleAdd}  className="submit-btn">CREATE</div>
       </div>
      
      <div className="taskContainer" >
      <>{ todo.map(obj => 
        <div id={obj.id}><Card  task={obj} setChange={setChange} /></div>) }</>
      </div>  


    </>

  )
}





export default App
