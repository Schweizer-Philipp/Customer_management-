import { useState } from "react";
import { CustomerType } from "./UseQueryCustomerList";

interface UseMutationCreateCustomerType {
  customerCreated: boolean;
  loading: boolean;
  error: {
    errors: {
      [key: string]: string;
    };
  } | null;
  connectionError: boolean;
  createCustomer: (customer: CustomerType) => Promise<void>;
}

function useMutationCreateCustomer(): UseMutationCreateCustomerType {
  const [customerCreated, setCustomerCreated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{
    errors: {
      [key: string]: string;
    };
  } | null>(null);
  const [connectionError, setConnectionError] = useState<boolean>(false);

  const createCustomer = async (customer: CustomerType): Promise<void> => {
    setCustomerCreated(false);
    setLoading(true);
    setError(null);
    setConnectionError(false);

    try {
      const response = await fetch("http://localhost:8080/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });

      if (response.ok) {
        setCustomerCreated(true);
      } else {
        const reponseError = await response.json();
        setError(reponseError);
      }
    } catch (error: any) {
      setConnectionError(true);
    } finally {
      setLoading(false);
    }
  };

  return { customerCreated, loading, error, connectionError, createCustomer };
}

export { useMutationCreateCustomer };
