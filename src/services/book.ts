import axios from "axios";
import config from "../config";
import { TBook } from "../types";

class BookService {
    static async getByName({ name }: { name: string }): Promise<TBook[]> {
        try {
            const response = await axios.get(
                `${config.googleApi}/volumes?q=${name}&langRestrict=es`
            );
            return response.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async getBySubject({
        subject,
    }: {
        subject: string;
    }): Promise<TBook[]> {
        try {
            const response = await axios.get(
                `${config.googleApi}/volumes?q=subject:${subject}&langRestrict=es&orderBy=newest`
            );
            return response.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async getBookById({ id }: { id: string }): Promise<TBook> {
        try {
            const response = await axios.get(
                `${config.googleApi}/volumes/${id}`
            );
            return response.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}

export default BookService;
