import {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {CartContext} from "../../CartContext.jsx";
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import DatePicker from "react-datepicker";
import {AgChartsReact} from "ag-charts-react";

export function DataOrders() {
    const {bills} = useContext(CartContext)
    const [gridApi, setGridApi] = useState()
    const gridRef = useRef();

    const dateFilterParams = {
        comparator: function (filterLocalDateAtMidnight, cellValue) {
            var dateAsString = cellValue;
            if (dateAsString == null) return -1;
            var cellDate = new Date(dateAsString);

            if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                return 0;
            }
            if (cellDate < filterLocalDateAtMidnight) {
                return -1;
            }
            if (cellDate > filterLocalDateAtMidnight) {
                return 1;
            }
        },
        browserDatePicker: true,
    };

    const columns = [
        {headerName: "Id", field: "id"},
        {headerName: "Amount", field: "amount", chartDataType: 'category'},
        {headerName: "Iva", field: "iva"},
        {headerName: "Date", field: "date", filter: 'agDateColumnFilter', filterParams:dateFilterParams}
    ]
    const defColumnDefs ={flex: 1}

    const onGridReady = (params) => {
        setGridApi(params)

    }
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const getFilterType = () => {
        if (startDate !== '' && endDate !== '') return 'inRange';
        else if (startDate !== '') return 'greaterThan'
        else if (endDate !== '') return 'lessThan'
    };

    useEffect(() => {
        console.log(gridApi)
        if (gridApi) {
            if (startDate !== '' && endDate !== '' && startDate > endDate) {
                alert("Start Date should be before End Date")
                setEndDate('')
            } else {
                var dateFilterComponent = gridApi.api.getFilterInstance('date');
                dateFilterComponent.setModel({
                    type: getFilterType(),
                    dateFrom: startDate ? startDate : endDate,
                    dateTo: endDate,
                });
                gridApi.api.onFilterChanged();
            }

        }

    }, [startDate, endDate])


    const onChangeDate = date =>{
        setStartDate(date.toISOString())
    }
    const onChangeDateEnd = date =>{
        setEndDate(date.toISOString())
    }





    return (
        <>
            <h2 align="center">Reporte de Facturas</h2>
            <p align="center">Reporte de ventas Mensuales</p>
            <div className="ag-theme-alpine" style={{ height: 400 }}>
                From : <DatePicker type="date" value={startDate} onChange={onChangeDate} />
                To : <DatePicker type="date" value={endDate} onChange={onChangeDateEnd} />
                <AgGridReact
                    rowData={bills}
                    columnDefs={columns}
                    defaultColDef={defColumnDefs}
                    onGridReady={onGridReady}
                />
            </div>
        </>
    )
}