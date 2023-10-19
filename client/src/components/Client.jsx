import { useQuery } from "@apollo/client";

import ClientRow from "./ClientRow";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";

export default function Client() {
  const { data, error, loading } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <p>Ops! Something went wrong.</p>;
  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Button</th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

// import React from "react";
// import { useQuery } from "@apollo/client";
// import ClientRow from "./ClientRow";
// import { GET_CLIENTS } from "../queries/clientQueries";
// import Spinner from "./Spinner";

// interface Client {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   // Add other properties as needed
// }

// interface ClientData {
//   clients: Client[];
// }

// export default function Client() {
//   const { data, error, loading } = useQuery<ClientData>(GET_CLIENTS);

//   if (loading) return <Spinner />;
//   if (error) return <p>Ops! Something went wrong.</p>;

//   return (
//     <>
//       {!loading && !error && (
//         <table className="table table-hover mt-3">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Button</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data?.clients.map((client) => (
//               <ClientRow key={client.id} client={client} />
//             ))}
//           </tbody>
//         </table>
//       )}
//     </>
//   );
// }
