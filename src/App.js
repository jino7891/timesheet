import { Auth } from "./presentation/auth/Auth";
import { db, storage } from './core/config/fireabase';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");
  const [fileUpload, setFileUpload] = useState(null);
  
  const projectsCollectionRef = collection(db, "projects");

  const getProjectsList = async () => {
    try {
      const data = await getDocs(projectsCollectionRef);
      const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setProjects(filteredData);
    } catch (error) {
      console.error(error);
    }
  }

  const createProject = async () => {
    try {
      await addDoc(projectsCollectionRef, {name: newProjectName, description: newProjectDesc});
      getProjectsList();
    } catch (error) {
      console.log(error);
    }
  }

  const deleteProject = async (id) => {
    try {
      const projectDoc =  doc(db, "projects", id);
      await deleteDoc(projectDoc);
    } catch (error) {
      console.error(error);
    }
  }

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filsFolderRef = ref(storage, `projectfiles/${fileUpload.name}`);
    try {
      await uploadBytes(filsFolderRef, fileUpload);
    } catch (error) {
      console.error(error);
    }
    
  }
  
  useEffect(() => {
    getProjectsList();
  });
  
  return (
    <div className="App">
      <Auth />
      <div>
        <input type="text" placeholder="Project Name" onChange={(e)=>setNewProjectName(e.target.value)} />
        <input type="text" placeholder="Project Desc" onChange={(e)=>setNewProjectDesc(e.target.value)} />
        <button onClick={createProject} >Create Project</button>
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile} >Upload File</button>
      </div>
      <div>
        {
          projects.map((project) => (
            <div key={project.id} >
              <h1>{project.name}</h1>
              <p>{project.description}</p>
              <button onClick={() => deleteProject(project.id)} >Delete</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;