import { useEffect, useState } from "react";

interface CustomerType {
  taxId: string;
  firstName: string;
  lastName: string;
  infos: string | null;
}

interface UseQueryCustomerListType {
  data: CustomerType[] | null;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

function useQueryCustomerList(): UseQueryCustomerListType {
  const [data, setData] = useState<CustomerType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCustomerList();
  }, []);

  const fetchCustomerList = async (): Promise<void> => {
    setLoading(true);
    setData(null);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/customers");

      if (response.ok) {
        let data = await response.json();
        setData(data);
      } else {
        setError(response.statusText);
      }
    } catch (error: any) {
      setError("server error");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData: fetchCustomerList };
}

export { useQueryCustomerList };

export type { CustomerType };
