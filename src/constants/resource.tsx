import { commonResources } from "./dbResources";

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
      parent: resource === "users" ? undefined : "common", // 유저가 아닌 것들만 common 하위 카테고리
    },
  }));
};

/**
 * resources
 */
export const resources = [...generateCommonResources(commonResources)];

/**
 * create label
 */
export function createLabel(resource: string): string {
  return resource
    .split("-")
    .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
