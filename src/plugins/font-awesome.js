import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faDownload
} from "@fortawesome/free-solid-svg-icons";

library.add(faUser, faUserPlus, faSignInAlt, faSignOutAlt, faDownload);

export { FontAwesomeIcon };