import { Divider, ListItem } from "@mui/material";
import styled from "@emotion/styled";
import List from "@mui/material/List";
import { CustomerType } from "../hooks/UseQueryCustomerList";

const CustomerListWrapper = styled(List)`
  width: 100%;
  max-width: 600px;
  overflow: auto;
  border: solid black 1px;
`;

const CustomerWrapper = styled.div`
  flex: 1;
  padding: var(--space-4);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  column-gap: var(--space-2);
`;

const CustomerPersonalDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 30%;
`;

const CustomerPersonalDataNameWrapper = styled.div`
  display: flex;
  column-gap: var(--space-2);
`;

const CustomerInfoWrapper = styled.div`
  flex-basis: 70%;
`;

function CustomerList({ customers }: { customers: CustomerType[] }) {
  return (
    <CustomerListWrapper>
      {customers.map((customer) => (
        <div key={customer.taxId}>
          <ListItem>{CustomerListElement({ customer })}</ListItem>
          <Divider variant="fullWidth" component="li" />
        </div>
      ))}
    </CustomerListWrapper>
  );
}

function CustomerListElement({ customer }: { customer: CustomerType }) {
  return (
    <CustomerWrapper>
      <CustomerPersonalDataWrapper>
        <CustomerPersonalDataNameWrapper>
          <p>{customer.firstName}</p>
          <p>{customer.lastName}</p>
        </CustomerPersonalDataNameWrapper>
        <p>{customer.taxId}</p>
      </CustomerPersonalDataWrapper>
      <CustomerInfoWrapper>
        <p>{customer.infos ?? "---"}</p>
      </CustomerInfoWrapper>
    </CustomerWrapper>
  );
}

export default CustomerList;
