import { DEFAULT_ERR_MESS } from "@/utils/constants/message.constant";
import { message } from "antd";
import appwrite from "./appwriteClient";

const teamService = {

    createTeam: async (teamID: string, name: string) => {
        try {
            const res = await appwrite.provider().teams.create(teamID, name)
            if (res) {
                return res
            }
        } catch (error: any) {
            message.error(error.message || DEFAULT_ERR_MESS);
        }
    }
};

export default teamService;
