import { useUserStore } from "src/stores/users";

export default async ({ store }) => {
  const users = useUserStore();
  users.loadUser();
};
