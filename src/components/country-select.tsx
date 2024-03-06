"use client";

import ReactSelect from "react-select";
import ReactCountryFlag from "react-country-flag";
import { TCountry, countries } from "@/lib/values/countries";

type Props = { value: string; setValue: (v: string) => void };

const getOption = (value: TCountry) => ({
  value: JSON.stringify(value),
  label: (
    <div className="p-3 rounded-xl flex gap-4 items-center">
      <ReactCountryFlag
        svg
        countryCode={value.code}
        className="!w-7 !h-7 rounded-full object-cover"
      />

      <span className="text-slate-700 text-md">{value.name}</span>
    </div>
  ),
});

const options = countries.map((value: TCountry) => getOption(value));

const CountrySelect = ({ value, setValue }: Props) => {
  return (
    <ReactSelect
      unstyled
      isSearchable
      options={options}
      instanceId="auth-country-select"
      value={getOption(JSON.parse(value))}
      onChange={(option) => setValue(option?.value!)}
      classNames={{
        option: () => ``,
        input: () => `pl-14`,
        control: () => `w-full`,
        placeholder: () => `px-3`,
        singleValue: () => `!pl-0`,
        indicatorsContainer: () => `pr-3`,
        menu: () =>
          `rounded-xl !top-[calc(100%+8px)] bg-white shadow-lg border-[1px] border-gray-200`,
        container: () =>
          `h-[56px] border-[1px] border-gray-300 rounded-xl flex items-center w-full`,
      }}
    />
  );
};

export default CountrySelect;
