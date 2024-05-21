/* eslint-disable react/prop-types */
import { Select } from 'antd';
import { useEffect, useState } from 'react';

const GenericSelect = ({ fetchData, style, onChange, value }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchFunction = async () => {
            try {
                const responseData = await fetchData();
                setData(responseData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFunction();
    }, [fetchData]);

    return (
        <Select style={style} onChange={onChange} value={value}>
            {data.map(item => (
                <Select.Option key={item.id} value={item.id}>
                    {item.nombre}
                </Select.Option>
            ))}
        </Select>
    );
}

export default GenericSelect;
