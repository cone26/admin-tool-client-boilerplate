import nestjsxCrudDataProvider from "@refinedev/nestjsx-crud";
const API_URL = import.meta.env.VITE_API_URL;

export const dataProvider = nestjsxCrudDataProvider(API_URL);
