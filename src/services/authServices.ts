import { DEFAULT_ERR_MESS } from "@/utils/constants/message.constant";
import { message } from "antd";
import api from ".";
import appwrite from "./appwriteClient";

const authService = {
  login: async (payload: { email: string; password: string }) => {
    const response = appwrite
      .provider()
      .account.createEmailSession(payload.email, payload.password)
      .then(async (loginRes) => {
        const userIDLogin = loginRes.userId
        const checkUserID = async () => {
          const teamListRes = await api.team.getTeamList()
          if (teamListRes) {
            var teamsID = teamListRes.teams.filter(team => (team.name === 'admin' || team.name === 'super admin')).map(item => item.$id)
            var teamRes = teamsID.map(async teamID => await api.team.getMemberList(teamID))
            if (teamRes) {
              if (teamRes.length !== 0) {
                return teamRes.map(item => Promise.resolve(item).then(value => value?.memberships.some(member => member.userId === userIDLogin)))
              } else {
                return false
              }
            }
          }

        }
        if (await checkUserID() === false) {
          message.error("you do not have permission to access this website!")
        }
        if (await checkUserID()) {
          return loginRes
        }
      })
      .catch((err) => {
        message.error(err.message);
        return null;
      });

    return response;
  },
  getMe: () => {
    return appwrite.provider().account.get();
  },
  updateUserMeName: async ({ name }: { name: string }) => {
    const response = await appwrite
      .provider()
      .account.updateName(name)
      .then((res) => res)
      .catch((error) => {
        message.error(error.message || DEFAULT_ERR_MESS);
      });
    return response;
  },
  updateUserMePref: async (userPrefs: object) => {
    try {
      const response = await appwrite.provider().account.updatePrefs(userPrefs);
      if (response) return response;
    } catch (error: any) {
      message.error(error.message || DEFAULT_ERR_MESS);
    }
  },
  updateUserMePassword: async (data: { password: string, oldPassword: string }) => {
    try {
      const response = await appwrite.provider().account.updatePassword(data.password, data.oldPassword)
      if (response) return response
    } catch (error: any) {
      message.error(error.message || DEFAULT_ERR_MESS)
    }
  },
  recoveryPassword: async (email: string, url: string) => {
    try {
      const response = await appwrite.provider().account.createRecovery(email, url)
      if (response) return response
    } catch (error: any) {
      message.error(error.message || DEFAULT_ERR_MESS)
    }
  },
  recoveryPasswordConfirm: async (userID: string, secret: string, password: string, rePassword: string) => {
    try {
      const response = await appwrite.provider().account.updateRecovery(userID, secret, password, rePassword)
      if (response) return response
    } catch (error: any) {
      message.error(error.message || DEFAULT_ERR_MESS)
    }
  }
};

export default authService;
