import { ProjectForm } from "@/common.types";
import {
  createProjectMutation,
  createUserMutation,
  getUserQuery,
  projectsQuery,
} from "@/graphql";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === "production";

const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";

const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "letmein";

const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);

const makeGrapQLResquest = async (query: string, variable = {}) => {
  try {
    return await client.request(query, variable);
  } catch (error) {
    throw error;
  }
};

export const getUser = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGrapQLResquest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);
  const variable = {
    input: {
      name,
      email,
      avatarUrl,
    },
  };

  return makeGrapQLResquest(createUserMutation, variable);
};

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);

    if (!response.ok) {
      throw new Error("Failed to fetch token");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const createNewProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    client.setHeader("Authorization", `Bearer ${token}`);

    const variable = {
      input: {
        ...form,
        image: imageUrl.url,
        createdBy: {
          link: creatorId,
        },
      },
    };

    return makeGrapQLResquest(createProjectMutation, variable);
  }
};

export const fetchAllProjects = async (
  category?: string | null,
  endcursor?: string | null
) => {
  client.setHeader("x-api-key", apiKey);

  const validCategory = category || "Frontend";

  return makeGrapQLResquest(projectsQuery, {
    category: validCategory,
    endcursor,
  });
};
