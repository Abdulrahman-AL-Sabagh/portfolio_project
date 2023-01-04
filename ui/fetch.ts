export const postToTheServer = async (
  url: string,
  body: Record<string, any>,
  otherOptions?: RequestInit
): Promise<any> => {
  const response = await fetch(url, {
    ...otherOptions,
    mode: "cors",
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export async function getFromTheServer<T extends object>(
  url: string
): Promise<[Response, T]> {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    credentials: "include",
  });
  const data: T = await response.json();

  return [response, data];
}
export const uploadImage = async (file: File) => {
  if (!process.env.NEXT_PUBLIC_IMAGE_SERVICE) return;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "my-uploads");
  const response = await fetch(process.env.NEXT_PUBLIC_IMAGE_SERVICE, {
    method: "POST",
    body: formData,
    "mode": "cors",
    credentials: "include",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
  return await response.json();
};
