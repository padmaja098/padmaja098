import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Table from './Table';
import Table from './component/Table';
function Routea() {
    return (
        <div>

            <BrowserRouter>
                <Routes>
                    {/* <Route path="/adc" element={<Table />} /> */}
                    <Route path="/tabledata" element={<Table />} />

                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default Routea;  