
import axios, { AxiosResponse } from "axios";

async function fileFromUrl(url: string): Promise<String[]> {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const data = response.data;
    const buffer = Buffer.from(data, "binary");
    const lines = buffer.toString().split("\n");
    return lines;
}


export { fileFromUrl };