import React, { useEffect, useState } from "react";

const useContacts = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getContacts = async () => {
      try {
        setIsLoading(true);

        const response = await fetch("https://randomuser.me/api/?results=100");
        const { results, error } = await response.json();

        if (error) {
          throw new Error(error);
        }

        setData(results);
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getContacts();
  }, []);

  return {
    data,
    isLoading,
    isError,
  };
};

export default function Contacts() {
  const contacts = useContacts();

  if (contacts.isLoading) {
    return (
      <div>
        <p>...Loading...</p>
      </div>
    );
  }

  if (contacts.isError) {
    return (
      <div>
        <p>...Error...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Contacts {contacts.data[0].name.first}</h1>
    </div>
  );
}
