import { useState, useEffect } from "react";

const useGetFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw Error("Nie udało się pobrać danych.");
                }
                return res.json();
            })
            .then((data) => {
                setData(data);
                setIsLoading(false);
                setError("");
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });
    }, [url]);

    return { data, isLoading, error };
};

export default useGetFetch;
