import { createWriteStream } from "fs";
import SwaggerParser from "@apidevtools/swagger-parser";

const generator = async () => {
  // methods
  /**
   * update db resources file
   */
  const updateResourceFiles = async (routes: string[]): Promise<void> => {
    const code = `
  /**
   * db resources
   */
  export const tables: string[] = [${routes.map((route) => "'" + route + "'")}];
    `;
    // create the file
    const fsStream = createWriteStream(`./src/constants/dbResources.tsx`);
    fsStream.write(code);
    fsStream.end();
  };

  /**
   * get out dto
   */
  const getOutDto = (response: any) => {
    const responseContent = Object.values(Object(response))[1];
    if (!responseContent) return response; //TODO: 없을 때 처리
    const responseExample = Object.values(responseContent)[0].schema.oneOf
      ? Object.values(responseContent)[0].schema.oneOf[0]
      : Object.values(responseContent)[0].schema;
    return responseExample.properties
      ? responseExample.properties
      : responseExample.items.properties;
  };

  const url = import.meta.env.VITE_SWAGGER_URL;

  //   parsing routes from swagger docs
  const api = await SwaggerParser.dereference(url);

  const commonRoutes = [];

  for (const path of Object.keys(Object(api.paths))) {
    const firstPath = path.split("/")[2];
    if (firstPath !== undefined) commonRoutes.push(firstPath);
  }

  // update resource file
  await updateResourceFiles(Array.from(new Set(commonRoutes)));

  const paths = api?.paths;
  if (paths) {
    Object.keys(paths).map((path) => {
      const methods = Object.keys(Object(paths[path]));
      methods.map((methodType) => {
        let response;
        if (methodType === "get") {
          response = paths[path]?.get?.responses["200"];
          const outDto = getOutDto(response);
          console.log(outDto);
        }
      });
    });
  }
};

await generator();
