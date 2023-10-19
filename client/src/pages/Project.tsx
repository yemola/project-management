import React from 'react';
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import ClientInfo from "../components/ClientInfo";
import Spinner from "../components/Spinner";
import { GET_PROJECT } from "../queries/projectQueries";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectForm from "../components/EditProjectForm";

// interface ProjectParams {
//   id: string;
// }

export default function Project() {
  const { id: string } = useParams();
  const { data, error, loading } = useQuery(GET_PROJECT, {
    variables: { id: string },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Ops! Something went wrong.</p>;

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>

          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>

          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{data.project.status}</p>

          {data.project.client && <ClientInfo client={data.project.client} />}

          <EditProjectForm project={data.project} />

          <DeleteProjectButton projectId={data.project.id} />
        </div>
      )}
    </>
  );
}
