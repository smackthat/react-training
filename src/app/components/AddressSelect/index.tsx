import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { defaultAddress } from 'app/pages/CheckoutPage';
import { selectAddresses } from 'app/pages/LoginPage/slice/selectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { Address } from 'types/User';

interface Props {
  setSelectedAddress: React.Dispatch<React.SetStateAction<Address>>;
}
export function AddressSelect({ setSelectedAddress }: Props) {
  const addresses = useSelector(selectAddresses);

  const handleChange = (e, value: Address | string) => {
    if (typeof value === 'string') {
      return;
    }
    if (value === null) {
      setSelectedAddress(defaultAddress);
    } else {
      setSelectedAddress(value as Address);
    }
  };

  const formatAddress = (address: Address) => {
    return `${address.street}, ${address.zipCode} ${address.city}`;
  };

  return (
    <Autocomplete
      onChange={handleChange}
      options={addresses}
      getOptionLabel={option => formatAddress(option)}
      style={{ width: 300 }}
      renderInput={params => <TextField {...params} variant="outlined" />}
    />
  );
}
