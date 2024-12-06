import { ConstantClass } from "../statics/config";

export interface ApiRequestData {
  method?: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  body?: Record<string, any> | null;
  form?: string;
  token?: string;
  credentials?: RequestCredentials;
  requested?: string;
  signal?: AbortSignal;
}

export interface ApiResponse {
  status: boolean;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any;
}

export const asyncSendApis = async (
  url: string,
  data: ApiRequestData
): Promise<ApiResponse> => {
  const method = data.method || "GET";

  let data_send: RequestInit = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  // Manejo de credenciales
  if (data.credentials) {
    data_send = Object.assign(data_send, { credentials: data.credentials });
  }

  // Agregar body si existe
  if (data.body) {
    if (data.form) {
      const headers = Object.assign({}, data_send.headers, {
        "Content-Type": data.form,
      });
      data_send = Object.assign(data_send, { headers });

      const formData = new FormData();
      if (typeof data.body === "object" && data.body !== null) {
        for (const key in data.body) {
          formData.append(key, data.body[key]);
        }
      }

      data_send = Object.assign(data_send, { body: formData });
    } else {
      data_send = Object.assign(data_send, { body: JSON.stringify(data.body) });
    }
  }

  // Agregar token si existe
  if (data.token) {
    const headers = Object.assign({}, data_send.headers, {
      Authorization: `Token ${data.token}`,
    });
    data_send = Object.assign(data_send, { headers });
  }

  // Agregar X-Requested-With si existe
  if (data.requested) {
    const headers = Object.assign({}, data_send.headers, {
      "X-Requested-With": data.requested,
    });
    data_send = Object.assign(data_send, { headers });
  }

  // **Agregamos el signal** si está disponible
  if (data.signal) {
    data_send = Object.assign(data_send, { signal: data.signal });
  }

  console.log(data_send);

  try {
    const response = await fetch(ConstantClass.webserviceName + url, data_send);
    const json = await response.json();
    json.status = response.ok;
    return json;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (error: any) {
    // Detectar si fue un error por cancelación
    if (error.name === "AbortError") {
      console.log("Request canceled by user");
    } else {
      console.error("Fetch error: ", error);
    }
    throw error; // Volvemos a lanzar el error para manejo superior si es necesario
  }
};
