import { boot } from "quasar/wrappers";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

export default boot(({ app }) => {
  dayjs.extend(relativeTime);
  dayjs.locale("ko");
  app.config.globalProperties.$dayjs = dayjs;
});
