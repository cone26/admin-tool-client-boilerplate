import { adminResources, commonResources } from "./dbResources";

/**
 * 리소스 생성
 */
export const generateCommonResources = (resources: string[]) => {
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
 * 리소스 생성
 */
export const generateAdminResources = (resources: string[]) => {
  return resources.map((resource) => ({
    name: resource,
    list: `/${resource}`,
    create: `/${resource}/create`,
    edit: `/${resource}/edit/:id`,
    show: `/${resource}/show/:id`,
    meta: {
      canDelete: true,
      label: createLabel(resource),
      parent: "admin",
    },
  }));
};

/**
 * resources
 */
export const resources = [
  ...generateCommonResources(commonResources),
  ...generateAdminResources(adminResources),
];

/**
 * create label
 */
export function createLabel(resource: string): string {
  return resource
    .split("-")
    .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
