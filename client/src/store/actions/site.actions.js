import * as actions from "./index";
import axios from "axios";
import { Server_API } from "constants/apiConstants";
import { getAuthHeader } from "utils/tools";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.patch["Content-Type"] = "application/json";

export const updateSiteVars = (args) => {
  return async (dispatch) => {
    try {
        const site = await axios.patch(Server_API+'api/site',args,getAuthHeader())

        dispatch(actions.getSiteVars(site.data))

        dispatch(
            actions.successGlobal("Site Info Changed!")
          );
          
    } catch (err) {
      dispatch(actions.errorGlobal(err.response.data.message));
    }
  };
};
