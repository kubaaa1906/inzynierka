import React from "react";
import { useState } from 'react';
import ReportDetails from "./ReportDetails";

const ShowReports = ({ reports, setReports }) => {
    const [selectedReport, setSelectedReport] = useState(null);

    const handleSelectReport = (report) => {
        setSelectedReport(report);
    };

    const handleCloseDetails = () => {
        setSelectedReport(null);
    };

    const handleDeleteReport = (reportId) => {
        setReports((prevReports) => prevReports.filter((report) => report._id !== reportId));
        setSelectedReport(null);
    };


    return (
        <div>
            {selectedReport ? (
                <ReportDetails report={selectedReport} onClose={handleCloseDetails} onDelete={handleDeleteReport} />
            ) : (
                reports.map((report) => (
                    <button key={report._id} onClick={() => handleSelectReport(report)}>
                        {report.tytul}, {report.dataZgloszenia}
                    </button>
                ))
            )}
        </div>
    );
};

export default ShowReports;