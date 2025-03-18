import React, { useEffect, useState } from "react";

const TodoList = () => {

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(null);



  useEffect(() => {
    getUser()
  }, [])


  const getUser = () => {
    fetch("https://playground.4geeks.com/todo/users/javier", {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return res.json()
    }).then((data) => {
      setTasks(data.todos)
    }).catch((err) => {
      console.log(err);
    })
  }

  


  const addTask = () =>{
    fetch(`https://playground.4geeks.com/todo/todos/javier`,{
      method: "POST",
      body: JSON.stringify(
        {
          label:input,
          is_done: false,
        }
      ),
      headers: {
           'Content-Type': 'application/json',
      },
      }).then((res) => {
        if(res.ok){
         return res.json();
        }
      }).then((data) => {
        console.log(data)
         setTasks([...tasks,data])
      }).catch((err) => {
          console.log(err);
      })
  }

  const deleteTodo = (taskId) =>{
    fetch(`https://playground.4geeks.com/todo/todos/${taskId}`,{
      method: "DELETE",
      headers: {
           'Content-Type': 'application/json',
      },
      }).then((res) => {
        if(res.ok){
          setTasks(tasks.filter((task) => task.id !== taskId));
        }
      }).catch((err) => {
          console.log(err);
       })
  }

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const inputKeyEnter = (e) => {
    if (input.trim() !== "" && e.key === "Enter") {
      addTask(e);
    }
  };

  const removeTask = (index) => {
    deleteTodo(index);
  };


  return (
    <div className="container p-4 " id="firstCont">
      <h1 className="text-2xl font-bold text-center mb-4">My list of tasks</h1>

      {/* Input para agregar nuevas tareas */}
      <div className="flex mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => inputKeyEnter(e)}
          className="border p-2 flex-grow"
          placeholder="Add a new task..."
        />
      </div>

      {/* Lista de tareas */}
      <div className="border p-2">
        {tasks.map((t, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 border-b"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <span>{t.label}</span>
            {hoveredIndex === index && (
              <button
                onClick={() => removeTask(t.id)}
                className="ml-2 p-1 bg-red-500 text-white rounded"
              >
                🗑
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;