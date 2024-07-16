import { tables } from "./dbResources";

/**
 * create the resources
 */
export const generateResources = (resources: string[]) => {
  return resources.map((resource) => ({
    name: resource,
    list: `/${resource}`,
    create: `/${resource}/create`,
    edit: `/${resource}/edit/:id`,
    show: `/${resource}/show/:id`,
    meta: {
      canDelete: true,
      label: createLabel(resource),
      parent: "common",
    },
  }));
};

/**
 * resources
 */
export const resources = [...generateResources(tables)];

/**
 * create label
 */
export function createLabel(resource: string): string {
  return resource
    .split("-")
    .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
