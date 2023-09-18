import Usman, { USMAN_PATH } from "./path";
import { DataTokenParam } from "./types";

const checkTokenUsman = async (
  data: DataTokenParam, token: string
): Promise<[any | null, any | null]> => {
  try {
    const response = await Usman.post(USMAN_PATH.TOKEN, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = response.data;
    if (result.status === "success") {
      return [result.data, null];
    } else {
      return [null, result.message];
    }
  } catch (error) {
    if (error instanceof Error) {
      return [null, error?.message]
    }
    return [null, 'Internal server error'];
  }
};

export {
  checkTokenUsman
}
