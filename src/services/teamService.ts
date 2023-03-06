import { DEFAULT_ERR_MESS } from "@/utils/constants/message.constant";
import { message } from "antd";
import { ID } from "appwrite";
import { isNumber } from "lodash";
import appwrite from "./appwriteClient";

const teamService = {

    getTeamList: async () => {
        try {
            const res = await appwrite.provider().teams.list();
            if (res) {
                return res
            }
        } catch (error: any) {
            message.error(error.message || DEFAULT_ERR_MESS);
        }
    },

    getTeam: async (teamID: string) => {
        try {
            const res = await appwrite.provider().teams.get(teamID);
            if (res) {
                return res
            }
        } catch (error: any) {
            message.error(error.message || DEFAULT_ERR_MESS);
        }
    },

    getMemberList: async (teamID: string) => {
        try {
            const res = await appwrite.provider().teams.listMemberships(teamID)
            if (res) return res
        } catch (error: any) {
            message.error(error.message || DEFAULT_ERR_MESS);
        }
    },

    createTeam: async (name: string) => {
        try {
            const res = await appwrite.provider().teams.create(ID.unique(), name)
            if (res) {
                return res
            }
        } catch (error: any) {
            message.error(error.message || DEFAULT_ERR_MESS);
        }
    },

    createMembership: async (teamID: string, email: string, role: [], url: string) => {
        try {
            const res = await appwrite.provider().teams.createMembership(teamID, email, role, url)
            if (res) {
                return res
            }
        } catch (error: any) {
            message.error(error.message || DEFAULT_ERR_MESS);
        }
    },
    deleteTeam: async (teamID: string) => {
        try {
            const res = await appwrite.provider().teams.delete(teamID)
            if (res) {
                return res
            }
        } catch (error: any) {
            message.error(error.message || DEFAULT_ERR_MESS);
        }
    },
    deleteMember: async (teamID: string, memberID: string) => {
        try {
            const res = await appwrite.provider().teams.deleteMembership(teamID, memberID)
            if (res) {
                return res
            }
        } catch (error: any) {
            message.error(error.message || DEFAULT_ERR_MESS);
        }
    },

    updateTeam: async (teamID: string, name: string) => {
        try {
            const res = await appwrite.provider().teams.update(teamID, name)
            if (res) {
                return res
            }
        } catch (error: any) {
            message.error(error.message || DEFAULT_ERR_MESS);
        }
    },
    getTotalMember: async (teamID: string) => {
        try {
            const res = await appwrite
                .provider()
                .teams.listMemberships(teamID);
            if (isNumber(res?.total)) return res.total;
            return 0;
        } catch (error: any) {
            if ("message" in error) message.error(error.message);
            return 0;
        }
    }
};

export default teamService;
