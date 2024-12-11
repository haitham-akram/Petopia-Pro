export default interface IQureyReturn {
  data: {
    id?: string;
  };
  error: {
    msg?: string;
    err?: object;
  };
}
