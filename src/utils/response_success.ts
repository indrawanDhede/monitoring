import { Response } from "express";

type ResponseData = {
  code: number;
  status: string;
  data?: any;
};

const responseSuccess = (res: Response, data: any) => {
  const response: ResponseData = {
    code: 200,
    status: "success",
    data: data,
  };
  return res.json(response)
};

export { responseSuccess };
