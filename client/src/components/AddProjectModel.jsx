import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/projectMutation";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function AddProjectModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  // Get Clients for select
  const { data, error, loading } = useQuery(GET_CLIENTS);

  if (loading) return null;
  if (error) return <p>Something went wrong</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || description === "" || status === "") {
      return alert("Please fill in all fields");
    }
    await addProject(name, description, status, clientId);

    setName("");
    setDescription("");
    setStatus("new");
    setClientId("");
  };

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>New Project</div>
            </div>
          </button>
          <div
            className="modal fade"
            id="addProjectModal"
            aria-labelledby="addProjectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="addProjectModalLabel">
                    New Project
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select
                        className="form-select"
                        id="clientId"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                      >
                        <option value="">Select Client</option>
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// import React, { useState } from "react";
// import { FaList } from "react-icons/fa";
// import { useMutation, useQuery } from "@apollo/client";
// import { ADD_PROJECT } from "src/mutations/projectMutation";
// import { GET_CLIENTS } from "src/queries/clientQueries";
// import { GET_PROJECTS } from "../queries/projectQueries";

// interface Client {
//   id: string;
//   name: string;
// }

// export default function AddProjectModal() {
//   const [name, setName] = useState<string>("");
//   const [description, setDescription] = useState<string>("");
//   const [clientId, setClientId] = useState<string>("");
//   const [status, setStatus] = useState<string>("new");

//   const [addProject] = useMutation(ADD_PROJECT, {
//     variables: { name, description, clientId, status },
//     update(cache, { data: { addProject } }) {
//       const queryResult = cache.readQuery<{ projects: any[] }>({
//         query: GET_PROJECTS,
//       });
//       const projects = queryResult?.projects || [];
//       cache.writeQuery({
//         query: GET_PROJECTS,
//         data: { projects: [...projects, addProject] },
//       });
//     },
//   });

//   // Get Clients for select
//   const { data, error, loading } = useQuery<{ clients: Client[] }>(GET_CLIENTS);

//   if (loading) return null;
//   if (error) return <p>Something went wrong</p>;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (name === "" || description === "" || status === "" || clientId === "") {
//       return alert("Please fill in all fields");
//     }
//     await addProject({ variables: { name, description, status, clientId } });

//     setName("");
//     setDescription("");
//     setStatus("new");
//     setClientId("");
//   };

//   return (
//     <>
//       {!loading && !error && (
//         <>
//           <button
//             type="button"
//             className="btn btn-primary"
//             data-bs-toggle="modal"
//             data-bs-target="#addProjectModal"
//           >
//             <div className="d-flex align-items-center">
//               <FaList className="icon" />
//               <div>New Project</div>
//             </div>
//           </button>
//           <div
//             className="modal fade"
//             id="addProjectModal"
//             aria-labelledby="addProjectModalLabel"
//             aria-hidden="true"
//           >
//             <div className="modal-dialog">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h1 className="modal-title fs-5" id="addProjectModalLabel">
//                     New Project
//                   </h1>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     data-bs-dismiss="modal"
//                     aria-label="Close"
//                   ></button>
//                 </div>
//                 <div className="modal-body">
//                   <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                       <label className="form-label">Name</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         id="name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                       />
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label">Description</label>
//                       <textarea
//                         className="form-control"
//                         id="description"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                       ></textarea>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label">Status</label>
//                       <select
//                         className="form-select"
//                         id="status"
//                         value={status}
//                         onChange={(e) => setStatus(e.target.value)}
//                       >
//                         <option value="new">Not Started</option>
//                         <option value="progress">In Progress</option>
//                         <option value="completed">Completed</option>
//                       </select>
//                     </div>
//                     <div className="mb-3">
//                       <label className="form-label">Client</label>
//                       <select
//                         className="form-select"
//                         id="clientId"
//                         value={clientId}
//                         onChange={(e) => setClientId(e.target.value)}
//                       >
//                         <option value="">Select Client</option>
//                         {data?.clients.map((client) => (
//                           <option key={client.id} value={client.id}>
//                             {client.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <button
//                       type="submit"
//                       className="btn btn-primary"
//                       data-bs-dismiss="modal"
//                     >
//                       Submit
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// }
