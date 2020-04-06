export default function getDataFromResponse (res: any){
  try {
    return res.data.data;
  } catch (e) {
    console.error('Response data is invalid');
    throw new Error('');
  }
}
