import axios from "axios";
import React from "react";
import { useState} from "react";
import { useEffect } from "react";
import "./Try.css"
const baseURL = "https://jsonplaceholder.typicode.com/todos";

export function Try() {
  const [data, setData] = useState([]);//for delete
  const [formData, setFormData] = useState({
    title: "",
    
  });
  const fetchData = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/todos",formData);
      console.log("Post created:", response.data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  const deletePost = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      console.log("Post deleted:",id);
      setData(data.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  const check=(e)=>{
         e.target.classList.add("checked")
  }
 return (
    <div className="main">
       <h2>Manage your task</h2>
        <div className="to-do"> 
          <form>
            <input type="text" name="title" value={formData.title} onChange={handleChange} />   
            <button type="submit" onClick={handleSubmit}>Add Task</button>
          </form>
      <div className="tasklist">
      
      <ul>
        {data.map((post) => (
         <div className="setlist">
          <li key={post.id} className="list" onClick={check}>
          {post.title}{" "}</li>
          <button className="btn-de" onClick={() => deletePost(post.id)}>Delete</button>
             
        </div>
        
          ))}
      </ul>
      </div>
        </div>
    </div>
  );
}