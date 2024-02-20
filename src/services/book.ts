import axios from "axios";
import config from "../config";
import { IBook, IBookDetail } from "../types";
import nodeCache from "node-cache";
const bookCache = new nodeCache({ stdTTL: 1000, checkperiod: 120 });

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
            if (bookCache.has(query)) {
                const response = bookCache.get(query);
                return response as IBook[];
            }

            const response = await axios.get(
                `${config.googleApi}/volumes?q=${query}&langRestrict=es&orderBy=newest&maxResults=${maxResults}&startIndex=${startIndex}`
            );

            bookCache.set(query, response.data);

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
            if (bookCache.has(subject)) {
                const response = bookCache.get(subject);
                return response as IBook[];
            }

            const response = await axios.get(
                `${config.googleApi}/volumes?q=subject:${subject}&langRestrict=es&orderBy=newest&maxResults=${maxResults}&startIndex=${startIndex}`
            );

            bookCache.set(subject, response.data);
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
            if (bookCache.has(id)) {
                const response = bookCache.get(id);
                return response as IBookDetail;
            }

            const response = await axios.get(
                `${config.googleApi}/volumes/${id}`
            );

            bookCache.set(id, response.data);

            return response.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static async getRandomBooks() {
        try {
            if (bookCache.has("randomBooks")) {
                const response = bookCache.get("randomBooks");
                return response;
            }

            const response = await axios.get(
                `${config.googleApi}/volumes?q=subject:fiction&langRestrict=es&orderBy=newest&maxResults=10`
            );

            bookCache.set("randomBooks", response.data);

            return response.data;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}

export default BookService;
