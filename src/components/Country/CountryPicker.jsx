import React from 'react'
import NativeSelect from '@material-ui/core/NativeSelect'
import FormControl from '@material-ui/core/FormControl'
const CountryPicker = ({ countries, handleCountryChange }) => {
    return (
        <FormControl style={{ marginTop: 20, marginBottom: 20 }}>
            <NativeSelect
                defaultValue="global"
                onChange={e => handleCountryChange(e.target.value)} >
                <option value="global">Global</option>
                {countries.map((country, index) => (
                    <option key={index} value={country}>{country}</option>
                ))}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker
