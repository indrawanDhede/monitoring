import BankBRI, { BRI_PATH } from "./path";

const getToken = async(): Promise<[any | null, any | null]> => {
  try {
    const response = await BankBRI.post(BRI_PATH.TOKEN);
    const result = response.data;
    if (result.status === "success") {
      return [result.data.token, null];
    } else {
      return [null, result.error];
    }
  } catch (error) {
    return[null, error];
  }
};

const briTransfer = async (data: any): Promise<[any | null, any | null]> => {
  try {
    const [token, error] = await getToken()
    if(error){
      return [null, error];
    }

    const response = await BankBRI.post(BRI_PATH.TRANSFER, data, {
      headers: {
        Authorization: token,
      },
    });

    const result = response.data;
    if (result.status === "success") {
      return [result.data, null];
    } else {
      return [null, result.error];
    }
  } catch (error) {
    return [null, error];
  }
};

export {
  briTransfer
}
