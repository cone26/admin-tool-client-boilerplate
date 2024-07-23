import nestjsxCrudDataProvider from "@refinedev/nestjsx-crud";
const API_URL = "http://localhost:3001/admin";
//import.meta.env.VITE_API_URL;
//TODO: config path setting
export const dataProvider = nestjsxCrudDataProvider(API_URL);
