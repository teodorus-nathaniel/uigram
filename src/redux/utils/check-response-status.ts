export default function checkResponseStatus (res: any){
  return res.data.status === 'success';
}
