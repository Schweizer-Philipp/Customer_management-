import React from "react";
import { useQueryCustomerList } from "./hooks/UseQueryCustomerList";
import CustomerList from "./components/CustomerList";
import styled from "@emotion/styled";
import { Button, CircularProgress } from "@mui/material";

const Header = styled.h1`
  background-color: var(--primary);
  color: white;
  padding: var(--space-5);
  margin: 0px;
`;

const CustomerManagementWrapper = styled.div`
  display: flex;
  max-height: 600px;
  padding: var(--space-6);
`;

const CustomerListComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CustomerListHeaderWrapper = styled.div`
  display: flex;
  background-color: var(--grey-800);
  justify-content: space-between;
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);

  h2 {
    color: white;
    margin: 0px;
    padding: var(--space-2);
  }

  button {
    border-top-right-radius: var(--border-radius);
  }
`;

const CustomerListWrapper = styled.div`
  display: flex;
  max-height: 100%;

  .error {
    color: red;
    margin: var(--space-3);
  }

  span {
    margin: var(--space-3);
  }
`;

function App() {
  const { data, error, loading, fetchData } = useQueryCustomerList();

  return (
    <div>
      <Header>Kunden Management</Header>
      <CustomerManagementWrapper>
        <CustomerListComponentWrapper>
          <CustomerListHeaderWrapper>
            <h2>Kunden Informationen</h2>
            <Button variant="contained" onClick={() => fetchData()}>
              Aktualisieren
            </Button>
          </CustomerListHeaderWrapper>
          <CustomerListWrapper>
            {loading && <CircularProgress size="var(--icon-size-6)" />}
            {!loading && data != null && (
              <CustomerList customers={data}></CustomerList>
            )}
            {!loading && error != null && (
              <div className="error">
                Es kam zu einem Fehler beim laden der Kunden Informationen
              </div>
            )}
          </CustomerListWrapper>
        </CustomerListComponentWrapper>
      </CustomerManagementWrapper>
    </div>
  );
}

export default App;
