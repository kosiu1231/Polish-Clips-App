import { useState, useEffect } from "react";

const useGetFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then((res) => {
                    if (!res.ok) {
                        throw Error("Could not fetch the data");
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
        }, 1000);
    }, [url]);

    return { data, isLoading, error };
};

export default useGetFetch;
