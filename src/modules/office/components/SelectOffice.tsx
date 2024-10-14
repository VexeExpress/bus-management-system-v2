import LoadingIndicator from "@/lib/loading";
import { RootState } from "@/redux/store";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useOffices from "../hook/useOfficesBySelect";

import { setSelectedOffice } from "@/redux/officeSlice";
import { SelectData } from "../types/SelectData";
import { useRouter } from "next/navigation";


const SelectOffice = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const companyId = useSelector((state: RootState) => state.auth.user?.companyId);
    console.log(companyId);
    const { offices, loading, error } = useOffices(companyId);
    const [selected, setSelected] = useState<number | string>("");


    const handleChange = (event: SelectChangeEvent<number | string>) => {
        const officeId = event.target.value as number | string;
        const selected = offices.find((office: SelectData) => office.id === Number(officeId));
        setSelected(event.target.value);
        if (selected) {
            dispatch(setSelectedOffice({ id: selected.id, name: selected.name }));
        }
        console.log("Selected Office:", selected);
    };
    const handleStartWork = () => {
        if (selected) {
            router.push('/ticket-01');
        }
    };

    return (
        <>
            <FormControl size="small" style={{ width: '80%' }}>
                <InputLabel id="demo-simple-select-label">Chọn phòng vé</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Chọn phòng vé"
                    value={selected}
                    onChange={handleChange}

                >

                    {loading && <MenuItem disabled><LoadingIndicator /></MenuItem>}
                    {error && <MenuItem disabled>{error.message}</MenuItem>}
                    {!loading && !error && offices.map((office: SelectData) => (
                        <MenuItem key={office.id} value={office.id}>
                            {office.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <br />
            <Button style={{ width: '80%' }} variant="contained" disabled={!selected} onClick={handleStartWork}>
                Bắt đầu làm việc
            </Button>
        </>
    )
}
export default SelectOffice;