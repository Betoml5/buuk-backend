import axios from "axios";
import config from "../config";
import { IBook, IBookDetail } from "../types";

class BookService {
    static async getByQuery({
        query,
        maxResults = 10,
        startIndex = 0,
    }: {
        query: string;
        maxResults: number;
        startIndex: number;
    }): Promise<IBook[]> {
        try {
            const response = await axios.get(
                `${config.googleApi}/volumes?q=${query}&langRestrict=es&orderBy=newest&maxResults=${maxResults}&startIndex=${startIndex}`
            );
            return response.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async getBySubject({
        subject,
        maxResults = 10,
        startIndex = 0,
    }: {
        subject: string;
        maxResults: number;
        startIndex: number;
    }): Promise<IBook[]> {
        try {
            const response = await axios.get(
                `${config.googleApi}/volumes?q=subject:${subject}&langRestrict=es&orderBy=newest&maxResults=${maxResults}&startIndex=${startIndex}`
            );
            return response.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async getById({ id }: { id: string }): Promise<IBookDetail> {
        if (!id) {
            throw new Error("Book id is required");
        }

        try {
            const response = await axios.get(
                `${config.googleApi}/volumes/${id}`
            );
            return response.data;
        } catch (error: any) {
            console.log(error);
            throw new Error(error);
        }
    }

    static async getRandomBooks() {
        try {
            // get 10 random books
            const response = await axios.get(
                `${config.googleApi}/volumes?q=subject:fiction&langRestrict=es&orderBy=newest&maxResults=10`
            );
            return response.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}

export default BookService;
