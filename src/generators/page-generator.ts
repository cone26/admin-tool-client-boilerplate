import { createWriteStream } from "fs";
import SwaggerParser from "@apidevtools/swagger-parser";
import { log } from "console";

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
  export const commonResources: string[] = [${routes.map(
    (route) => "'" + route + "'"
  )}];
    `;
    // 파일 생성
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
  const gameRoutes = [];

  for (const path of Object.keys(Object(api.paths))) {
    const firstPath = path.split("/")[2];
    if (firstPath !== undefined) commonRoutes.push(firstPath);
  }

  // resource file 업데이트
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
